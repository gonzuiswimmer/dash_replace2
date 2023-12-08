<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ArticleRequest;
use App\Models\Article;
use App\Models\ArticleCategories;
use App\Models\User;
use App\Models\Tag;
use App\Models\ArticleFavorites;
use App\Models\ArticleComments;
use App\Models\ArticleLikes;
use App\Services\RankingService;
use App\Services\BadgeService;
use Ramsey\Uuid\Type\Integer;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use League\CommonMark\CommonMarkConverter;
use Illuminate\Support\Facades\View;
use Illuminate\Support\HtmlString;
use ParsedownExtra;



class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $articleRanking = RankingService::ArticleRanking();
        $rankingByNumberOfArticlesPerTag = RankingService::TagRanking();

        $articlesQuery = Article::query()
            ->where('is_deleted', false)
            ->orderByDesc('created_at')
            ->whereNotNull('shipped_at')
            ->orderByDesc('created_at');

        //キーワード検索
        $keyword = $request->input('keyword');
        $article_category_id = $request->input('article_category_id');
        $department_id = $request->input('department_id');

        $entryDate = $request->input('articleEntryDate');

        if (!empty($keyword)) {
            // 全角スペースを半角スペースに変換
            $keyword = mb_convert_kana($keyword, 's');

            // キーワードを空白で区切る
            $keywords = explode(' ', $keyword);

            $articlesQuery->where(function ($query) use ($keywords) {
                foreach ($keywords as $keyword) {
                    $query->where(function ($query) use ($keyword) {
                        $query->where('title', 'LIKE', "%{$keyword}%")
                            ->orWhere('body', 'LIKE', "%{$keyword}%")
                            ->orWhereHas('user', function ($q) use ($keyword) {
                                $q->where('name', 'LIKE', "%{$keyword}%");
                            });
                    });
                }
            });
        }
        //カテゴリー検索
        if (!empty($article_category_id)) {
            $articlesQuery->where('article_category_id', $article_category_id);
        }

        //職種検索
        if (!empty($department_id)) {
            $articlesQuery->whereHas('user', function ($q) use ($department_id) {
                $q->where('department_id', $department_id);
            });
        }

        //入社年月検索
        if (!empty($entryDate)) {
            $entryDate = Carbon::parse($entryDate)->format('Y-m');
            $articlesQuery->whereHas('user', function ($q) use ($entryDate) {
                $q->whereRaw('to_char(entry_date, \'YYYY-MM\') = ?', [$entryDate]);
            });
        }

        // タグ検索
        $tagId = $request->input('tag_id');
        if (!empty($tagId)) {
            $articlesQuery->whereHas('tags', function ($q) use ($tagId) {
                $q->where('tags.id', $tagId);
            });
        }



        $articles = $articlesQuery->paginate(10);

        return view('articles.index', compact('articles', 'keyword', 'article_category_id', 'department_id', 'articleRanking', 'rankingByNumberOfArticlesPerTag', 'entryDate', 'tagId'));
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('articles.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ArticleRequest $request, Article $article)
    {

        DB::beginTransaction();
        try {
            $user = Auth::user();
            // 下書き保存か公開かで分岐
            if (isset($request->saveAsDraft)) {
                $article = Article::create([
                    'user_id' => $user->id,
                    'title' => $request->title,
                    'body' => $request->body,
                    'is_deleted' => false,
                    'comments_count' => 0,
                    'shipped_at' => null,
                    'article_category_id' => $request->article_category_id,
                ]);
            } else if (isset($request->create)) {
                $article = Article::create([
                    'user_id' => $user->id,
                    'title' => $request->title,
                    'body' => $request->body,
                    'is_deleted' => false,
                    'comments_count' => 0,
                    'shipped_at' => Carbon::now()->format('Y/m/d H:i:s'),
                    'article_category_id' => $request->article_category_id,

                ]);
            };


            $tags = [];

            foreach ($request->tags as $tag) {
                $tagInstance = Tag::firstOrCreate(['name' => $tag]);
                $tags[] = $tagInstance->id;
            }

            $article->tags()->syncWithPivotValues($tags, ['is_deleted' => false]);
            BadgeService::upGradeBadgeStatus($request);
            DB::commit();
            return to_route('articles.index')->with('status', '投稿を作成しました。');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('articles.index')->with('status', 'エラー：更新処理に失敗しました。');
        }
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Article $article, User $user, ArticleFavorites $articleFavorites, ArticleComments $comments, ArticleCategories $articleCategories)
    {
        if ($article->is_deleted) {
            abort(404); // 論理削除された記事の場合は404エラーを返す
        }

        $article->load('articleComments.user');
        $category = $articleCategories->find($article->article_category_id);
        $comments = $comments->where('is_deleted', false)->get();

        // マークダウンをHTMLに変換
        $markdownBody = $article->body;
        $parsedown = new ParsedownExtra();
        $convertedBody = $parsedown->text($markdownBody);

        return View::make('articles.show', [
            'article' => $article,
            'convertedBody' => $convertedBody,
            'user' => $user,
            'articleFavorites' => $articleFavorites,
            'comments' => $comments,
            'articleCategory' => $category,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Article $article)
    {
        $article = Article::with(['tags'])->find($article->id);
        $tags = $article->tags;

        return view('articles.edit', compact('article', 'tags'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ArticleRequest $request, Article $article)
    {

        // $article = Article::find($article)->first();
        $article->load('tags');

        // 下書き保存の更新処理
        if (isset($request->saveAsDraft)) {
            $article->title = $request->title;
            $article->body = $request->body;
            $article->article_category_id = $request->article_category_id;
            $article->shipped_at = null;
            // 公開したブログの更新処理
        } else if (isset($request->update)) {
            $article->title = $request->title;
            $article->body = $request->body;
            $article->article_category_id = $request->article_category_id;
            // 下書きを公開する処理
        } else if (isset($request->saveAsPublicArticle)) {
            $article->title = $request->title;
            $article->body = $request->body;
            $article->article_category_id = $request->article_category_id;
            $article->shipped_at = Carbon::now()->format('Y/m/d H:i:s');
        }
        $article->save();

        // タグの保存
        $tags = [];
        foreach ($request->tags as $tag) {
            $tagInstance = Tag::firstOrCreate(['name' => $tag]);
            $tags[] = $tagInstance->id;
        }
        $article->tags()->syncWithPivotValues($tags, ['is_deleted' => false]);
        BadgeService::upGradeBadgeStatus($request);

        return to_route('articles.myblog', Auth::id())->with('status', '情報を更新しました。');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Article $article)
    {
        $article->is_deleted = true;
        $article->save();

        BadgeService::downGradeBadgeStatus($article->user->id);

        return redirect()->route('articles.index');
    }
    public function showArticles($id)
    {
        $user = User::find($id);
        $articles =  Article::with(['user'])
            ->whereNotNull('shipped_at')
            ->where('is_deleted', '=', false)
            ->where('user_id', '=', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        $answers = 'test';
        return view('articles.myblog', compact('user', 'articles'));
    }

    public function showFavoriteArticles($id)
    {
        // ユーザーのお気に入り記事を取得
        $user = User::find($id);
        $articleFavorites = $user->articleFavorites()->with('user')
            ->whereHas('articles', function ($query) {
                $query->where('is_deleted', false);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return view('articles.favorites', compact('user', 'articleFavorites'));
    }

    public function favorite(Article $article, Request $request)
    {
        if (Auth::check()) {
            $user = Auth::user();

            $existingFavorite = ArticleFavorites::where('user_id', $user->id)
                ->where('article_id', $article->id)
                ->first();

            if ($existingFavorite) {
                // 既存のお気に入りレコードが存在する場合
                if ($existingFavorite->is_deleted) {
                    // 削除されている場合は is_deleted を false に更新
                    $existingFavorite->is_deleted = false;
                    $existingFavorite->save();
                }
            } else {
                // 新しいお気に入りレコードを作成
                $articleFavorites = new ArticleFavorites;
                $articleFavorites->user_id = $user->id;
                $articleFavorites->article_id = $article->id;
                $articleFavorites->is_deleted = false;
                $articleFavorites->save();
            }
        }

        return redirect()->route('articles.show', ['article' => $article->id]);
    }

    public function unfavorite(Article $article, Request $request)
    {
        if (Auth::check()) {
            $user = Auth::user();

            $article->articleFavorites()
                ->where('user_id', $user->id)
                ->update(['is_deleted' => true]);
        }

        return redirect()->route('articles.show', ['article' => $article->id]);
    }




    public function showMyDraftArticles($id)
    {
        $user = User::find($id);
        $articles =  Article::with(['user', 'tags'])
            ->whereNull('shipped_at')
            ->where('is_deleted', false)
            ->where('user_id', '=', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(2);

        return view('articles/myDraftArticles', compact('articles'));
    }

    public function commentStore(Request $request, Article $article)
    {
        $inputs = request()->validate([
            'comment' => 'required|max:255'
        ], [
            'comment.required' => 'コメントを入力してください。',
            'comment.max' => 'コメントは255文字以内で入力してください。',
        ]);

        $comments = ArticleComments::create([
            'comment' => $inputs['comment'],
            'user_id' => auth()->user()->id,
            'article_id' => $article->id,
            'is_deleted' => false,

        ]);
        // コメント保存後、記事のコメント数をインクリメント
        $article->increment('comments_count');

        return redirect()->route('articles.show', ['article' => $article->id]);
    }

    public function commentUpdate(Request $request, $article, $comment)
    {
        $article = Article::findOrFail($article);
        $comment = ArticleComments::findOrFail($comment);

        $inputs = request()->validate([
            'comment' => 'required|max:255'
        ], [
            'comment.required' => 'コメントを入力してください。',
            'comment.max' => 'コメントは255文字以内で入力してください。',
        ]);

        $comment->update([
            'comment' => $request->input('comment'),
            'user_id' => auth()->user()->id,
            'article_id' => $article->id,
            'is_deleted' => false,
        ]);

        return redirect()->route('articles.show', ['article' => $article->id])->withErrors($inputs);
    }

    public function commentDestroy(Article $article, ArticleComments $comment)
    {

        // コメントの論理削除
        $comment->update(['is_deleted' => true]);

        // 記事のコメント数をデクリメント
        $article->decrement('comments_count');


        return redirect()->route('articles.show', ['article' => $article->id]);
    }

    public function likeStore(Article $article)
    {
        $user = Auth::user();

        // 現在のいいね数を取得
        $likeCount = $article->likes->where('is_deleted', false)->count();

        $existingLike = ArticleLikes::where('user_id', $user->id)
            ->where('article_id', $article->id)
            ->first();

        if ($existingLike) {
            // 既にいいねが存在する場合
            if ($existingLike->is_deleted) {
                // 削除されている場合はis_deletedをfalseに更新
                $existingLike->is_deleted = false;
                $existingLike->save();
            }
        } else {
            // 新しいいいねレコードを作成
            $like = new ArticleLikes();
            $like->user_id = $user->id;
            $like->article_id = $article->id;
            $like->is_deleted = false;
            $like->save();
        }
        // いいね数を再取得
        $likeCount = $article->likeCount();

        // return response()->json(['message' => 'いいねしました', 'likeCount' => $likeCount + 1]);
        return response()->json(['message' => 'いいねしました', 'likeCount' => $likeCount]);
    }

    public function likeDestroy(Article $article)
    {
        $user = Auth::user();

        // 現在のいいね数を取得
        $likeCount = $article->likes->where('is_deleted', false)->count();


        $like = ArticleLikes::where('user_id', $user->id)
            ->where('article_id', $article->id)
            ->first();

        if ($like) {
            // いいねが存在する場合はis_deletedをtrueに更新
            $like->is_deleted = true;
            $like->save();
        }

        return response()->json(['message' => 'いいねを解除しました', 'likeCount' => $likeCount - 1]);
    }
}
