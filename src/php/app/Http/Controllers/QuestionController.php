<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Tag;
use App\Models\User;
use App\Models\Article;
use App\Models\MonthlyReport;
use App\Models\MonthlyReportComments;
use App\Models\QuestionAnswers;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Services\RankingService;
use App\Services\SearchService;
use Cron\MonthField;


class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        list($questions, $filteredBy) = SearchService::searchQuestions($request);

        return view('questions/index', compact('questions', 'filteredBy'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('questions/create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            'title' => ['string', 'max:255', 'required'],
            'body' => ['string', 'max:255', 'required'],
            'tags' => ['array', 'required'],
        ];

        DB::beginTransaction();
        try {
            $user = Auth::user();
            // 下書き保存処理
            if (isset($request->saveAsDraft)) {
                $question = Question::create([
                    'user_id' => $user->id,
                    'title' => $request->title,
                    'body' => $request->body,
                    'is_deleted' => false,
                    'answer_count' => 0,
                    'shipped_at' => null,
                ]);
                // 保存して公開処理
            } else if (isset($request->create)) {
                $this->validate($request, $rules);
                $question = Question::create([
                    'user_id' => $user->id,
                    'title' => $request->title,
                    'body' => $request->body,
                    'is_deleted' => false,
                    'answer_count' => 0,
                    'shipped_at' => Carbon::now()->format('Y/m/d H:i:s'),
                ]);
            }
            ;

            $tags = [];
            foreach ($request->tags as $tag) {
                $tagInstance = Tag::firstOrCreate(['name' => $tag]);
                $tags[] = $tagInstance->id;
            }

            $question->tags()->syncWithPivotValues($tags, ['is_deleted' => false]);
            DB::commit();
            return to_route('questions.index')->with('status', '投稿を作成しました。');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('questions.index')->with('status', 'エラー：更新処理に失敗しました。');

        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function show(Question $question, User $user, MonthlyReportComments $comments)
    {
        $question = Question::find($question->id);
        if ($question->is_deleted) {
            abort(404);
        }
        return view('questions/show', compact('question'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function edit(Question $question)
    {
        $question = Question::with(['tags'])->find($question->id);
        $tags = $question->tags;
        return view('questions.edit', compact('question', 'tags'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Question $question)
    {
        $rules = [
            'title' => ['string', 'max:255', 'required'],
            'body' => ['string', 'max:255', 'required'],
            'tags' => ['array', 'required'],
        ];

        DB::beginTransaction();
        try {
            // 下書き保存の更新処理
            if (isset($request->saveAsDraft)) {
                $question->title = $request->title;
                $question->body = $request->body;
                $question->shipped_at = null;
                // 公開した質問の更新処理
            } else if (isset($request->update)) {
                $this->validate($request, $rules);
                $question->title = $request->title;
                $question->body = $request->body;
                // 下書きを公開する処理
            } else if (isset($request->saveAsPublicQuestion)) {
                $this->validate($request, $rules);
                $question->title = $request->title;
                $question->body = $request->body;
                $question->shipped_at = Carbon::now()->format('Y/m/d H:i:s');
            }
            $question->save();

            // タグの保存
            $tags = [];
            foreach ($request->tags as $tag) {
                $tagInstance = Tag::firstOrCreate(['name' => $tag]);
                $tags[] = $tagInstance->id;
            }
            $question->tags()->syncWithPivotValues($tags, ['is_deleted' => false]);
            DB::commit();
            return to_route('questions.show', $request->id)->with('status', '情報を更新しました。');
        } catch (\Exception $e) {
            DB::rollBack();
            return to_route('questions.show', $request->id)->with('status', 'エラー：更新処理に失敗しました。');
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function destroy(Question $question)
    {
        $question->is_deleted = true;
        $question->save();

        return to_route('questions.showMyQuestions', Auth::id())->with('status', '削除しました。');
    }

    public function showMyQuestions(User $user)
    {
        $questions = Question::with(['user', 'tags', 'questionAnswers'])
            ->whereNotNull('shipped_at')
            ->where('is_deleted', '=', false)->where('user_id', '=', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(2);

        return view('questions/myQuestions', compact('questions', 'user'));
    }

    public function showMyDraftQuestions(User $user)
    {
        if (Auth::id() != $user->id) {
            abort(404);
        }
        $questions = Question::with(['user', 'tags', 'questionAnswers'])
            ->whereNull('shipped_at')->where('user_id', '=', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(2);

        return view('questions/myDraftQuestions', compact('questions'));
    }
    public function noAnswers()
    {
        $questions = Question::doesntHave('questionAnswers')
            ->whereNotNull('shipped_at')
            ->where('is_deleted', false)
            ->orderBy('created_at', 'desc')->get();

        return view('questions/noAnswers', compact('questions'));
    }
    public function commentStore(Request $request, Question $question)
    {
        $inputs = request()->validate([
            'answer' => 'required|max:255',
        ]);

        $comments = QuestionAnswers::create([
            'answer' => $inputs['answer'],
            'user_id' => auth()->user()->id,
            'question_id' => $question->id,
            'is_reply' => false,
            // 'reply_parent_id' => $comment->id,
            'reply_parent_id' => 0,
            'is_deleted' => false,

        ]);
        

        return redirect()->route('questions.show', ['question' => $question->id]);

    }

    public function commentUpdate(Request $request, $question, $comment)
    {
        $question = Question::findOrFail($question);
        $comment = QuestionAnswers::findOrFail($comment);

        $comment->update([
            'answer' => $request->input('answer'),
            'user_id' => auth()->user()->id,
            'question_id' => $question->id,
            'is_reply' => false,
            // 'reply_parent_id' => $comment->id,
            'reply_parent_id' => 0,
            'is_deleted' => false,
        ]);

        return redirect()->route('questions.show', ['question' => $question->id]);
    }


    public function commentDestroy(Question $question, QuestionAnswers $comment)
    {
        // $comment->delete();

        // コメントの論理削除
        $comment->update(['is_deleted' => true]);

        return redirect()->route('questions.show', ['question' => $question->id]);
    }

    public function replyStore(Request $request, Question $question, QuestionAnswers $comment)
{
    $inputs = $request->validate([
        'answer' => 'required|max:255',
    ]);

    $reply = new QuestionAnswers();
    $reply->answer = $inputs['answer'];
    $reply->user_id = auth()->user()->id;
    $reply->question_id = $question->id;
    $reply->is_reply = true;
    $reply->reply_parent_id = $comment->id;
    $reply->is_deleted = false;
    $reply->save();

    return redirect()->route('questions.show', ['question' => $question->id]);
}

public function replyUpdate(Request $request, Question $question, QuestionAnswers $reply)
{
    $inputs = $request->validate([
        'answer' => 'required|max:255',
    ]);

    $reply->answer = $inputs['answer'];
    $reply->save();

    return redirect()->route('questions.show', ['question' => $question->id]);
}

public function replyDestroy(Question $question, QuestionAnswers $reply)
{
    $reply->is_deleted = true;
    $reply->save();

    return redirect()->route('questions.show', ['question' => $question->id]);
}



}
