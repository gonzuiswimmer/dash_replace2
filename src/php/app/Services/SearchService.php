<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Question;
use App\Models\Department;
use App\Models\MonthlyReport;
use Carbon\Carbon;


class SearchService
{
    /**
     * ユーザー検索のメソッド
     *
     * 勤務状況、氏名、入社日、所属それぞれの条件によって検索
     * @return User
     */
    public static function searchUser($request){
        $subQuery = User::with(['department']);

        if(isset($request->status)){
            if($request->status === "retired"){
                $subQuery = $subQuery->whereNotNull('deleted_at');
            }else if($request->status === "working"){
                $subQuery = $subQuery->whereNull('deleted_at');
            }
        }

        if(isset($request->name)){
            // 全角スペースを半角スペースに
            $spaceConversion = mb_convert_kana($request->name, 's');
            // ,や半角スペースなどで分けて配列に
            $wordArraySearched = preg_split('/[\s,]+/', $spaceConversion,-1,PREG_SPLIT_NO_EMPTY);
            foreach($wordArraySearched as $word){
                $subQuery = $subQuery->where('name','LIKE','%'.$word.'%');
            }
        }

        if(isset($request->hiredMonth)){
            $subQuery = $subQuery->where('entry_date','LIKE',$request->hiredMonth.'%');
        }

        if(isset($request->department)){
            $subQuery = $subQuery->where('department_id', '=', $request->department);
        }

        $users = $subQuery->paginate(20);
        return $users;
    }

    /**
     * QA検索のメソッド
     *
     * キーワード、所属、入社日のいづれかで条件分岐して検索
     * @return Question $questions
     * @return String $filtering
     */
    public static function searchQuestions($request){
        $subQuery = Question::with(['tags','user','questionAnswers']);
        $filteredBy = '';

        if(isset($request->keyword)){
            // 全角スペースを半角スペースに
            $spaceConversion = mb_convert_kana($request->keyword, 's');
            // ,や半角スペースなどで分けて配列に
            $wordArraySearched = preg_split('/[\s,]+/', $spaceConversion,-1,PREG_SPLIT_NO_EMPTY);

            foreach( $wordArraySearched as $word){
                $subQuery = $subQuery
                ->where('title','LIKE','%'.$word.'%')
                ->orWhere('body','LIKE','%'.$word.'%')
                ->orWhereHas('user',function($query) use ($word){
                    $query->where('name','LIKE','%'.$word.'%');
                });
            }
            $filteredBy = 'キーワード：'.$spaceConversion;
        }else if(isset($request->department)){
            $department = $request->department;
            $subQuery = $subQuery->whereHas('user',function($query) use ($department){
                $query->where('department_id',$department);
            });
            $filteredBy = '所属：'.Department::find($department)->name;
        } else if(isset($request->hiredMonth)){
            $hiredMonth = $request->hiredMonth;
            $subQuery = $subQuery->whereHas('user',function($query) use ($hiredMonth) {
                $query->where('entry_date', 'LIKE', $hiredMonth.'%');
            });
            $filteredBy = '入社日：'.$hiredMonth;
        } else if(isset($request->tag)){
            $tag = $request->tag;
            $subQuery = $subQuery->whereHas('tags',function($query) use ($tag) {
                $query->where('name', $tag);
            });
            $filteredBy = 'タグ：「'.$tag.'」';
        } else {
            $filteredBy = null;
        }

        $questions = $subQuery->where('is_deleted',false)->whereNotNull('shipped_at')->orderBy('created_at','desc')->paginate(4);

        return [$questions,$filteredBy];
    }

    /**
     * 月報検索のメソッド
     *
     * 氏名、所属、入社日、対象月期間、アサイン状況、タグ、担当工程それぞれの条件によって検索
     * @return MonthlyReport
     */
    public static function searchMonthlyReports($request){
        $subQuery = MonthlyReport::with(['user', 'tags']);

        if(isset($request->name)){
            // 全角スペースを半角スペースに
            $spaceConversion = mb_convert_kana($request->name, 's');
            // ,や半角スペースなどで分けて配列に
            $wordArraySearched = preg_split('/[\s,]+/', $spaceConversion,-1,PREG_SPLIT_NO_EMPTY);

            foreach( $wordArraySearched as $word){
                $subQuery = $subQuery
                ->orWhereHas('user',function($query) use ($word){
                    $query->where('name','LIKE','%'.$word.'%');
                });
            }
        } else if(isset($request->department)){
            $department = $request->department;
            $subQuery = $subQuery->whereHas('user',function($query) use ($department){
                $query->where('department_id',$department);
            });
        } else if(isset($request->hiredMonth)){
            $hiredMonth = $request->hiredMonth;
            $subQuery = $subQuery->whereHas('user',function($query) use ($hiredMonth) {
                $query->where('entry_date', 'LIKE', $hiredMonth.'%');
            });
        } else if(isset($request->fromMonth) && isset($request->toMonth)){
            $subQuery = $subQuery->whereDate('target_month', '>=', $request->fromDate)->whereDate('target_month', '<=', $request->toDate);
        } else if(isset($request->tags)){
            foreach($request->tags as $tag){
                $subQuery = $subQuery->whereHas('tags', function($query) use ($tag) {
                    $query->where('tag_name',$tag);
                });
            }
        } else if(isset($request->assign)){
            $subQuery = $subQuery->where('assign',$request->assign);
        } else if(isset($request->processes)){
            foreach($request->processes as $process){
                $subQuery = $subQuery->where($process,true);
            }
        }

        $monthlyReports = $subQuery->where('is_deleted',false)->whereNotNull('shipped_at')->orderBy('shipped_at', 'desc')->paginate(10);
        return $monthlyReports;
    }

    public static function recentMonthlyReports($request){
        $subQuery = MonthlyReport::with(['user', 'tags']);

        $monthlyReports = $subQuery->where('is_deleted',false)->whereNotNull('shipped_at')->orderBy('shipped_at', 'desc')->take(3)->get();
        return $monthlyReports;
    }

    public static function reportsOfFollowingUser($request){
        $subQuery = MonthlyReport::with(['user', 'tags']);

        $monthlyReports = $subQuery->where('is_deleted',false)->whereNotNull('shipped_at')->orderBy('shipped_at', 'desc')->take(3)->get();
        return $monthlyReports;
    }
}
