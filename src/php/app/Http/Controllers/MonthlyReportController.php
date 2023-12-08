<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Tag;
use App\Models\User;
use App\Models\Department;
use App\Models\MonthlyReport;
use App\Models\MonthlyWorkingProcess;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;
use App\Models\MonthlyReportComments;
use App\Services\RankingService;
use App\Services\SearchService;

class MonthlyReportController extends Controller
{
    public function index(Request $request) {

        $monthlyReportRanking = RankingService::MonthlyReportRanking();

        $reports = SearchService::searchMonthlyReports($request);

        return view('monthlyReport.top', compact('reports','monthlyReportRanking'));
    }

    public function create() {

        return view('monthlyReport.create');
    }

    public function store(Request $request) {

        $workingProcess = new MonthlyWorkingProcess();
        // バリデーション
        $rules = [
            'target_month' => 'required',
            'project_summary' => ['string', 'max:255', 'required'],
            'business_content' => ['string', 'max:1000', 'required'],
            'looking_back' => ['string', 'max:500', 'required'],
            'next_month_goals' => ['string', 'max:500', 'required'],
            'assign' => 'required'
        ];

        // $inputs = $request->validate([
        //     'target_month' => 'required',
        //     'project_summary' => 'required',
        //     'business_content' => 'required',
        //     'looking_back' => 'required',
        //     'next_month_goals' => 'required',
        //     'assign' => 'required',
        // ]);

        if(isset($request->saveAsDraft)) {
            $report = MonthlyReport::create([
                'user_id' => auth()->user()->id,
                'target_month' => $request->target_month,
                'shipped_at' => null,
                'project_summary' => $request->project_summary,
                'business_content' => $request->business_content,
                'looking_back' => $request->looking_back,
                'next_month_goals' => $request->next_month_goals,
                'comments_count' => 0,
                'likes_count' => 0,
                'assign' => $request->assign,
                'is_deleted' => false
            ]);
            $workingProcess->monthly_report_id = $report->id;

            foreach($request->workingProcess as $process) {
                if($process == 'definition') {
                    $workingProcess->process_definition = true;
                }
                if($process == 'design') {
                    $workingProcess->process_design = true;
                }
                if($process == 'implementation') {
                    $workingProcess->process_implementation = true;
                }
                if($process == 'test') {
                    $workingProcess->process_test = true;
                }
                if($process == 'operation') {
                    $workingProcess->process_operation = true;
                }
                if($process == 'analysis') {
                    $workingProcess->process_analysis = true;
                }
                if($process == 'training') {
                    $workingProcess->process_training = true;
                }
                if($process == 'structure') {
                    $workingProcess->process_structure = true;
                }
                if($process == 'trouble') {
                    $workingProcess->process_trouble = true;
                }
            }
        } else if(isset($request->create)) {
            $this->validate($request, $rules);
            $report = MonthlyReport::create([
                'user_id' => auth()->user()->id,
                'target_month' => $request->target_month,
                'shipped_at' => Carbon::now()->format('Y/m/d H:i:s'),
                'project_summary' => $request->project_summary,
                'business_content' => $request->business_content,
                'looking_back' => $request->looking_back,
                'next_month_goals' => $request->next_month_goals,
                'comments_count' => 0,
                'likes_count' => 0,
                'assign' => $request->assign,
                'is_deleted' => false
            ]);
            $workingProcess->monthly_report_id = $report->id;

            foreach($request->workingProcess as $process) {
                if($process == 'definition') {
                    $workingProcess->process_definition = true;
                }
                if($process == 'design') {
                    $workingProcess->process_design = true;
                }
                if($process == 'implementation') {
                    $workingProcess->process_implementation = true;
                }
                if($process == 'test') {
                    $workingProcess->process_test = true;
                }
                if($process == 'operation') {
                    $workingProcess->process_operation = true;
                }
                if($process == 'analysis') {
                    $workingProcess->process_analysis = true;
                }
                if($process == 'training') {
                    $workingProcess->process_training = true;
                }
                if($process == 'structure') {
                    $workingProcess->process_structure = true;
                }
                if($process == 'trouble') {
                    $workingProcess->process_trouble = true;
                }
            }
        }

        $tags = [];

            foreach($request->tags as $tag){
                $tagInstance = Tag::firstOrCreate(['name' => $tag]);
                $tags[] = $tagInstance->id;
            }

            $report->tags()->sync($tags);

        $workingProcess->save();

        return redirect()->route('monthlyReport.show', $report->id);
    }

    public function show(MonthlyReport $monthlyReport, User $user, MonthlyReportComments $comments) {

        $report = MonthlyReport::find($monthlyReport->id);
        $userId = $monthlyReport->user_id;
        $monthlyReport->load('monthlyReportComments.user');


        if ($report->is_deleted == true) {
            abort(404);
        }

        // 1. 月報情報を取得
        // 2. target_monthカラムのデータをもとにCarbon::parseでdatetime型に整形。月初を取得後、文字列に
        // 3. whereDateでtarge_monthが同じデータを引っ張ってきて取得（getはコレクション型/firstで1件取得。2行目のtoDateStringはなくてもいけるかも...?）
        $monthlyReport = MonthlyReport::where('user_id', $userId)->first();
        $fromDate = Carbon::parse($monthlyReport->target_month)->subMonthWithNoOverflow(1)->startOfMonth()->toDateString();
        $previousMonthlyReport = MonthlyReport::where('user_id',$userId)->whereDate('target_month','=',$fromDate)->first();

        return view('monthlyReport.show2', compact('report', 'previousMonthlyReport','user','comments','monthlyReport'));
    }

    public function edit(MonthlyReport $monthlyReport) {

        $report = MonthlyReport::with(['tags'])->find($monthlyReport->id);
        $tags = $report->tags;
        // dd($report->target_month);

        return view('monthlyReport.edit', compact('report', 'tags'));
    }

    public function update(Request $request, MonthlyReport $monthlyReport) {

        $report = MonthlyReport::find($monthlyReport->id);
        $workingProcess = MonthlyWorkingProcess::where('monthly_report_id', '=', $monthlyReport->id)->first();

         // バリデーション
        $rules = [
            'target_month' => 'required',
            'project_summary' => ['string', 'max:255', 'required'],
            'business_content' => ['string', 'max:1000', 'required'],
            'looking_back' => ['string', 'max:500', 'required'],
            'next_month_goals' => ['string', 'max:500', 'required'],
            'assign' => 'required'
        ];

        //  $inputs = $request->validate([
        //     'target_month' => 'required',
        //     'project_summary' => 'required',
        //     'business_content' => 'required',
        //     'looking_back' => 'required',
        //     'next_month_goals' => 'required',
        //     'assign' => 'required',
        // ]);

        // working_processテーブルの全てのカラムをfalseに設定する
        $workingProcess->process_definition = false;
        $workingProcess->process_design = false;
        $workingProcess->process_implementation = false;
        $workingProcess->process_test = false;
        $workingProcess->process_operation = false;
        $workingProcess->process_analysis = false;
        $workingProcess->process_training = false;
        $workingProcess->process_structure = false;
        $workingProcess->process_trouble = false;
        $workingProcess->save();

        // $colums = $workingProcess->getColums();
        // dd($colums);


        // 下書き保存の更新処理
        if (isset($request->saveAsDraft)) {
            $report->target_month = $request->target_month;
            $report->project_summary = $request->project_summary;
            $report->business_content = $request->business_content;
            $report->looking_back = $request->looking_back;
            $report->next_month_goals = $request->next_month_goals;
            $report->assign = $request->assign;
            $report->shipped_at = null;

            foreach($request->workingProcess as $process) {
                if($process == 'definition') {
                    $workingProcess->process_definition = true;
                }
                if($process == 'design') {
                    $workingProcess->process_design = true;
                }
                if($process == 'implementation') {
                    $workingProcess->process_implementation = true;
                }
                if($process == 'test') {
                    $workingProcess->process_test = true;
                }
                if($process == 'operation') {
                    $workingProcess->process_operation = true;
                }
                if($process == 'analysis') {
                    $workingProcess->process_analysis = true;
                }
                if($process == 'training') {
                    $workingProcess->process_training = true;
                }
                if($process == 'structure') {
                    $workingProcess->process_structure = true;
                }
                if($process == 'trouble') {
                    $workingProcess->process_trouble = true;
                }
            }

        // 公開した質問の更新処理
        } else if (isset($request->update)) {
            $this->validate($request, $rules);
            $report->target_month = $request->target_month;
            $report->project_summary = $request->project_summary;
            $report->business_content = $request->business_content;
            $report->looking_back = $request->looking_back;
            $report->next_month_goals = $request->next_month_goals;
            $report->assign = $request->assign;

            foreach($request->workingProcess as $process) {
                if($process == 'definition') {
                    $workingProcess->process_definition = true;
                }
                if($process == 'design') {
                    $workingProcess->process_design = true;
                }
                if($process == 'implementation') {
                    $workingProcess->process_implementation = true;
                }
                if($process == 'test') {
                    $workingProcess->process_test = true;
                }
                if($process == 'operation') {
                    $workingProcess->process_operation = true;
                }
                if($process == 'analysis') {
                    $workingProcess->process_analysis = true;
                }
                if($process == 'training') {
                    $workingProcess->process_training = true;
                }
                if($process == 'structure') {
                    $workingProcess->process_structure = true;
                }
                if($process == 'trouble') {
                    $workingProcess->process_trouble = true;
                }
            }
        // 下書きを公開する処理
        } else if (isset($request->saveAsPublicReport)) {
            $this->validate($request, $rules);
            $report->target_month = $request->target_month;
            $report->project_summary = $request->project_summary;
            $report->business_content = $request->business_content;
            $report->looking_back = $request->looking_back;
            $report->next_month_goals = $request->next_month_goals;
            $report->assign = $request->assign;
            $report->shipped_at = Carbon::now()->format('Y/m/d H:i:s');

            foreach($request->workingProcess as $process) {
                if($process == 'definition') {
                    $workingProcess->process_definition = true;
                }
                if($process == 'design') {
                    $workingProcess->process_design = true;
                }
                if($process == 'implementation') {
                    $workingProcess->process_implementation = true;
                }
                if($process == 'test') {
                    $workingProcess->process_test = true;
                }
                if($process == 'operation') {
                    $workingProcess->process_operation = true;
                }
                if($process == 'analysis') {
                    $workingProcess->process_analysis = true;
                }
                if($process == 'training') {
                    $workingProcess->process_training = true;
                }
                if($process == 'structure') {
                    $workingProcess->process_structure = true;
                }
                if($process == 'trouble') {
                    $workingProcess->process_trouble = true;
                }
            }
        }
        $report->save();
        $workingProcess->save();

        // タグの保存
        $tags = [];
        foreach($request->tags as $tag){
            $tagInstance = Tag::firstOrCreate(['name' => $tag]);
            $tags[] = $tagInstance->id;
        }
        $report->tags()->sync($tags);

        return redirect()->route('monthlyReport.show', $report);
    }

    public function destroy(MonthlyReport $monthlyReport) {
        $report = MonthlyReport::find($monthlyReport->id);
        $report->is_deleted = true;
        $report->save();

        return redirect()->route('monthlyReport.index');

    }

    public function showMyReports($id) {
        $user = User::find($id);
        $reports = MonthlyReport::with(['user', 'tags'])
                            ->whereNotNull('shipped_at')
                            ->where('is_deleted', '=', false)
                            ->where('user_id', '=', $user->id)
                            ->orderBy('target_month', 'desc')
                            ->paginate(5);

        return view('monthlyReport.myReports', compact('reports', 'user'));
    }

    public function showMyDraftReports($id) {
        $user = Auth()->user();
        $reports = MonthlyReport::with(['user', 'tags'])
                            ->whereNull('shipped_at')
                            ->where('user_id', '=', $user->id)
                            ->orderBy('created_at', 'desc')
                            ->paginate(5);

        return view('monthlyReport.myDraftReports', compact('reports','user'));
    }

    public function commentStore(Request $request, MonthlyReport $monthlyReport)
{
    $inputs = request()->validate([
        'comment' => 'required|max:255'
    ]);

    $comments = MonthlyReportComments::create([
        'comment' => $inputs['comment'],
        'user_id' => auth()->user()->id,
        'monthly_report_id' => $monthlyReport->id,
        'is_deleted' => false,
    ]);
    // コメント保存後、月報のコメント数をインクリメント
    $monthlyReport->increment('comments_count');

    return redirect()->route('monthlyReport.show', ['monthlyReport' => $monthlyReport->id]);

}


public function commentUpdate(Request $request, $monthlyReport, $comment)
{
    $monthlyReport = MonthlyReport::findOrFail($monthlyReport);
    $comment = MonthlyReportComments::findOrFail($comment);

    $comment->update([
        'comment' => $request->input('comment'),
        'user_id' => auth()->user()->id,
        'monthly_report_id' => $monthlyReport->id,
        'is_deleted' => false,
    ]);

    return redirect()->route('monthlyReport.show', ['monthlyReport' => $monthlyReport->id]);
}

public function commentDestroy(MonthlyReport $monthlyReport, MonthlyReportComments $comment)
{
    // コメントの論理削除
    $comment->update(['is_deleted' => true]);

    // 記事のコメント数をデクリメント
    $monthlyReport->decrement('comments_count');

    return redirect()->route('monthlyReport.show', ['monthlyReport' => $monthlyReport->id]);
}
}

