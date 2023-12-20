<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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

        return response()->json(json_encode([$announcements,$recentReports,$reportsOfFollowingUser]), 200);
        // return view('top',compact('announcements','recentReports','reportsOfFollowingUser'));
    }
}
