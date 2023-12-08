<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Announcement;
use App\Services\SearchService;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $announcements = Announcement::orderBy('created_at','DESC')->paginate(3);
        $recentReports = SearchService::recentMonthlyReports($request);
        $reportsOfFollowingUser = SearchService::reportsOfFollowingUser($request);

        return view('top',compact('announcements','recentReports','reportsOfFollowingUser'));
    }

    public function showAnnouncementPage()
    {
        $announcements = Announcement::orderBy('created_at','DESC')->paginate(10);

        return view('showAllPage',compact('announcements'));
    }
}
