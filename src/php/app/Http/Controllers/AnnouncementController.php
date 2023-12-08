<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Announcement;
use Carbon\Carbon;


class AnnouncementController extends Controller
{
    public function showAll(){
        $announcements = Announcement::orderBy('created_at','DESC')->paginate(10);
        return view('admin/announcement/showAllPage',compact('announcements'));
    }

    public function create(){
        return view('admin/announcement/create');
    }

    public function store(Request $request){
        DB::beginTransaction();
        try{
            Announcement::create([
                'title' => $request->title,
                'body' => $request->body,
                'published_date' => Carbon::today()->format('Y-m-d'),
            ]);
            DB::commit();
            return to_route('admin.announcement.showAll')->with('status','お知らせを作成しました。');
        }catch(\Exception $e){
            DB::rollBack();
            return to_route('admin.announcement.showAll')->with('status','お知らせの作成に失敗しました。');
        }
    }
}
