<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Models\Tag;
use App\Models\Article;
use App\Models\MonthlyReport;
use App\Models\User;
use App\Models\UserBadge;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;


class BadgeService
{
    // 記事公開によってバッジステータスを上げる処理
    public static function upGradeBadgeStatus($request)
    {
        $countOfArticles = Article::where('user_id', $request->user()->id)->where('is_deleted', false)->whereNotNull('shipped_at')->count();
        $comment = null;

        if ($countOfArticles === 1) {
            $badge = UserBadge::updateOrCreate(
                [
                    'user_id' => $request->user()->id,
                    'badge_id' => 1,
                ],
                ['is_deleted' => false]
            );
            $comment = '1つ目の投稿です!メダルを獲得しました';
        } else if ($countOfArticles === 3) {
            $badge = UserBadge::updateOrCreate(
                [
                    'user_id' => $request->user()->id,
                    'badge_id' => 2,
                ],
                ['is_deleted' => false]
            );
            $comment = '3つ目の投稿です!新しいメダルを獲得しました!';
        } else if ($countOfArticles === 5) {
            $badge = UserBadge::updateOrCreate(
                [
                    'user_id' => $request->user()->id,
                    'badge_id' => 3,
                ],
                ['is_deleted' => false]
            );
            $comment = '5つ目の投稿です!新しいメダルを獲得しました!';
        } else if ($countOfArticles === 10) {
            $badge = UserBadge::updateOrCreate(
                [
                    'user_id' => $request->user()->id,
                    'badge_id' => 4,
                ],
                ['is_deleted' => false]
            );
            $comment = '通算10投稿を達成したので、新しいメダルを獲得しました!';
        } else if ($countOfArticles === 20) {
            $badge = UserBadge::updateOrCreate(
                [
                    'user_id' => $request->user()->id,
                    'badge_id' => 5,
                ],
                ['is_deleted' => false]
            );
            $comment = '通算20投稿を達成したので、新しいメダルを獲得しました!';
        } else if ($countOfArticles === 30) {
            $badge = UserBadge::updateOrCreate(
                [
                    'user_id' => $request->user()->id,
                    'badge_id' => 6,
                ],
                ['is_deleted' => false]
            );
            $comment = '通算30投稿を達成したので、新しいメダルを獲得しました!';
        } else if ($countOfArticles === 75) {
            $badge = UserBadge::updateOrCreate(
                [
                    'user_id' => $request->user()->id,
                    'badge_id' => 7,
                ],
                ['is_deleted' => false]
            );
            $comment = '通算75投稿を達成したので、新しいメダルを獲得しました!';
        } else if ($countOfArticles === 100) {
            $badge = UserBadge::updateOrCreate(
                [
                    'user_id' => $request->user()->id,
                    'badge_id' => 8,
                ],
                ['is_deleted' => false]
            );
            $comment = '通算100投稿を達成したので、新しいメダルを獲得しました!';
        }

        session()->flash('message', $comment);
    }

    // 記事削除によってバッジステータスを下げる処理
    public static function downGradeBadgeStatus()
    {
        $countOfArticles = Article::where('user_id', Auth::id())->where('is_deleted', false)->whereNotNull('shipped_at')->count();
        $comment = '';
        if ($countOfArticles === 0) {
            $badge = UserBadge::updateOrCreate(
                [
                    'user_id' => Auth::id(),
                    'badge_id' => 1,
                ],
                ['is_deleted' => true]
            );
            $comment = 'メダルをすべて失いました。新しい投稿をしてメダルを獲得しましょう!';
        } else if ($countOfArticles === 2) {
            $badge = UserBadge::updateOrCreate(
                [
                    'user_id' => Auth::id(),
                    'badge_id' => 2,
                ],
                ['is_deleted' => true]
            );
            $comment = 'メダルを失いました。新しい投稿をしてメダルを獲得しましょう!';
        } else if ($countOfArticles === 4) {
            $badge = UserBadge::updateOrCreate(
                [
                    'user_id' => Auth::id(),
                    'badge_id' => 3,
                ],
                ['is_deleted' => true]
            );
            $comment = 'メダルを失いました。新しい投稿をしてメダルを獲得しましょう!';
        } else if ($countOfArticles === 9) {
            $badge = UserBadge::updateOrCreate(
                [
                    'user_id' => Auth::id(),
                    'badge_id' => 4,
                ],
                ['is_deleted' => true]
            );
            $comment = 'メダルを失いました。新しい投稿をしてメダルを獲得しましょう!';
        } else if ($countOfArticles === 19) {
            $badge = UserBadge::updateOrCreate(
                [
                    'user_id' => Auth::id(),
                    'badge_id' => 5,
                ],
                ['is_deleted' => true]
            );
            $comment = 'メダルを失いました。新しい投稿をしてメダルを獲得しましょう!';
        } else if ($countOfArticles === 29) {
            $badge = UserBadge::updateOrCreate(
                [
                    'user_id' => Auth::id(),
                    'badge_id' => 6,
                ],
                ['is_deleted' => true]
            );
            $comment = 'メダルを失いました。新しい投稿をしてメダルを獲得しましょう!';
        } else if ($countOfArticles === 74) {
            $badge = UserBadge::updateOrCreate(
                [
                    'user_id' => Auth::id(),
                    'badge_id' => 7,
                ],
                ['is_deleted' => true]
            );
            $comment = 'メダルを失いました。新しい投稿をしてメダルを獲得しましょう!';
        } else if ($countOfArticles === 99) {
            $badge = UserBadge::updateOrCreate(
                [
                    'user_id' => Auth::id(),
                    'badge_id' => 8,
                ],
                ['is_deleted' => true]
            );
            $comment = 'メダルを失いました。新しい投稿をしてメダルを獲得しましょう!';
        }

        session()->flash('message', $comment);
    }

    // ユーザーが保持するバッジを検索して返す処理
    public static function checkBadges($id)
    {
        $badges = UserBadge::where('is_deleted', false)->where('user_id', $id)->orderBy('badge_id', 'asc')->get();
        return ($badges);
    }

}