<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Mail\SendInquiryMail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\View\View;
use App\Models\UserProfile;
use App\Models\Department;
use App\Models\UserFollow;
use App\Models\Inquiry;
use App\Models\User;
use App\Services\CheckFormService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Models\UserRole;
use App\Services\BadgeService;
use App\Services\SearchService;

class ProfileController extends Controller
{
    // 他のユーザーのプロフィール詳細画面
    public function show(Request $request, $id)
    {
        $user = User::find($id);
        $user_profile = UserProfile::where('user_id', $id)->first();
        $department = Department::where('id', $user->department_id)->first();
        $allocation = CheckFormService::checkAllocation($user);
        $gender = CheckFormService::checkGender($user);
        $blood_type = CheckFormService::checkBloodType($user_profile);
        $entry_date = Carbon::parse($user->entry_date)->format('Y年m月d日');
        $birthday = Carbon::parse($user_profile->birthday)->format('Y年m月d日');
        $badges = BadgeService::checkBadges($id);

        return view('profile.show', [
            'user' => $user,
            'user_profile' => $user_profile,
            'department' => $department,
            'allocation' => $allocation,
            'gender' => $gender,
            'blood_type' => $blood_type,
            'entry_date' => $entry_date,
            'birthday' => $birthday,
            'badges' => $badges,
        ]);
    }

    // 自分のプロフィール編集画面
    public function edit(Request $request): View
    {
        $user = $request->user();
        $user_profile = UserProfile::where('user_id', $user->id)->first();
        $departments = Department::all();
        $allocation = CheckFormService::checkAllocation($user);
        $gender = CheckFormService::checkGender($user);
        $entry_date = Carbon::parse($user->entry_date)->format('Y年m月d日');
        $followings = $user->followings()->orderBy('user_id')->get();
        $followers = $user->followers()->orderBy('followed_user_id')->get();
        $badges = BadgeService::checkBadges($user->id);

        return view('profile.edit', [
            'user' => $user,
            'user_profile' => $user_profile,
            'departments' => $departments,
            'allocation' => $allocation,
            'gender' => $gender,
            'entry_date' => $entry_date,
            'followings' => $followings,
            'followers' => $followers,
            'badges' => $badges,
        ]);
    }

    // 自分のプロフィール編集
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $user_profile = UserProfile::where('user_id', $user->id)->first();

        $user->department_id = $request->department_id;
        $user_profile->blood_type = $request->blood_type;
        $user_profile->birthday = $request->birthday;
        $user_profile->github_url = $request->github_url;
        $user_profile->qiita_url = $request->qiita_url;
        $user_profile->self_introduction = $request->self_introduction;

        $request->user()->save();
        $user_profile->save();

        return redirect()->back();
    }

    // public function destroy(Request $request): RedirectResponse
    // {
    //     $request->validateWithBag('userDeletion', [
    //         'password' => ['required', 'current-password'],
    //     ]);

    //     $user = $request->user();

    //     Auth::logout();

    //     $user->delete();

    //     $request->session()->invalidate();
    //     $request->session()->regenerateToken();

    //     return Redirect::to('/');
    // }

    // フォロー機能
    public function follow($id)
    {
        UserFollow::updateOrCreate(['user_id' => $id, 'followed_user_id' => Auth::id()], ['is_deleted' => false]);

        return redirect()->back();
    }

    // フォロー解除機能
    public function unfollow($id)
    {
        UserFollow::where(['user_id' => $id, 'followed_user_id' => Auth::id()])->update(['is_deleted' => true]);

        return redirect()->back();
    }

    /**
     * ユーザー検索
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function searchUser(Request $request)
    {
        $request->merge(['status' => 'working']);
        $users = SearchService::searchUser($request);
        $departments = Department::all();

        return view('profile/searchUser', compact('users', 'departments'));
    }

    /**
     * 問い合わせを新規作成し、担当の管理者へメール通知を行う
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function submitInquiry(Request $request)
    {
        $rules = [
            'inquiry' => ['max:1000', 'required'],
        ];

        $user_name = User::find($request->user_id)->name;
        $toUser = User::whereHas('role', function ($query) {
            $query->where('inquiry_send', 1);
        })->select('email')->get()->toArray();
        $ccUser = User::whereHas('role', function ($query) {
            $query->where('inquiry_send', 0);
        })->select('email')->get()->toArray();

        DB::beginTransaction();
        try {
            $this->validate($request, $rules);
            $inquiry = Inquiry::create([
                'user_id' => $request->user_id,
                'body' => $request->inquiry,
                'referer' => $request->referer,
            ]);
            DB::commit();
            $this->sendEmail($user_name, $inquiry->body, $toUser, $ccUser);
            return to_route('top')->with('status', 'お問い合わせを送信しました');
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e->getMessage());
            return to_route('top')->with('status', 'お問い合わせの送信に失敗しました');
        }
    }

    /**
     * メールを送信する処理
     *
     * @param $body 問い合わせ内容
     * @param $name 問い合わせしたユーザー名
     * @param $toUser toに設定した管理者（=user_roleテーブルのinquiry_sendカラムが1のユーザー）
     * @param $toUser ccに設定した管理者（=user_roleテーブルのinquiry_sendカラムが2のユーザー）
     *
     * @return void
     */
    public function sendEmail($body, $name, $toUser, $ccUser)
    {
        Mail::to($toUser)->cc($ccUser)->send(new SendInquiryMail($body, $name));
    }

}