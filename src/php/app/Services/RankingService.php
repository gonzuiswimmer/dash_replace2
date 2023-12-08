<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Models\Tag;
use App\Models\Article;
use App\Models\MonthlyReport;
use App\Models\User;
use Carbon\Carbon;


class RankingService
{
    // 月報ランキング取得のクエリ
    public static function MonthlyReportRanking(){
        $fromDate = Carbon::now()->subMonthsWithNoOverflow(6)->startOfMonth();
        $toDate = Carbon::now()->subMonthWithNoOverflow(1)->startOfMonth();
        $fromDate = Carbon::parse($fromDate)->toDateString();
        $toDate = Carbon::parse($toDate)->toDateString();
        $monthlyReportRanking = MonthlyReport::with(['user'])->where('is_deleted',false)->selectRaw('sum(likes_count) as number_of_likes_count, user_id')->whereDate('target_month', '>=', $fromDate)->whereDate('target_month', '<=', $toDate)->groupBy('user_id')->orderBy('number_of_likes_count','DESC')->take(10)->get();

        return $monthlyReportRanking;
    }

    // ブログランキング取得のクエリ
    public static function ArticleRanking(){
        $fromDate = Carbon::now()->subMonthsWithNoOverflow(5)->startOfMonth();
        $toDate = Carbon::now()->endOfMonth();
        $subQuery = Article::with(['user'])
        ->whereBetween('shipped_at',[$fromDate,$toDate])
        ->where('is_deleted',false)
        ->withCount('ArticleLikes')
        ->toSql();

        $articleRankings = DB::table(DB::raw('('.$subQuery.') as likes_count_by_article'))
        ->selectRaw('sum(article_likes_count) as number_of_article_likes, user_id')
        ->groupBy('user_id')
        ->setBindings([':fromDate'=>$fromDate,':toDate'=>$toDate,':is_deleted'=>false])
        ->orderBy('number_of_article_likes','desc')
        ->take(10)
        ->get();

        $collection = collect();
        foreach($articleRankings as $articleRanking){
            $user = array(
            'name'=>User::find($articleRanking->user_id)->name,
            'number_of_article_likes'=>$articleRanking->number_of_article_likes,
            'id' => $articleRanking->user_id,
        );
            $collection->push($user);
        }

        return $collection;
    }

    // タグ別投稿数ランキング取得のクエリ
    public static function TagRanking(){
        $rankingByNumberOfArticlesPerTag = Tag::withCount('articles')
        ->orderBy('articles_count','desc')
        ->take(10)
        ->get();
        return $rankingByNumberOfArticlesPerTag;
    }
}
