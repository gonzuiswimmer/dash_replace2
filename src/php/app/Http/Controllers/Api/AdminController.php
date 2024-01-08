<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\UserProfile;
use App\Models\UserRole;
use App\Models\Department;
use App\Http\Requests\AdminProfileUpdateRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Controllers\Controller;
use App\Services\SearchService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{

    public function users(Request $request)
    {
        $users = SearchService::searchUser($request);

        return response()->json([$users], 200);
    }

    public function getDepartments(){
        $departments = Department::all();

        return response()->json([$departments],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RegisterRequest $request)
    {
        DB::beginTransaction();
        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'department_id' => $request->department_id,
                'beginner_flg' => $request->beginner_flg,
                'entry_date' => $request->entry_date,
                'gender' => $request->gender
            ]);

            UserProfile::create([
                'user_id' => $user->id,
                'blood_type' => 0
            ]);

            DB::commit();
            return response()->json(['CreateUserResult' => true], 200);
        } catch (\Exception $e){
            DB::rollBack();
            return response()->json(['CreateUserResult' => false, 'message' => $e], 200);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::find($id);
        $user_profile = UserProfile::where('user_id', $user->id)->first();
        $followings = $user->followings()->orderBy('user_id')->get();
        $followers = $user->followers()->orderBy('followed_user_id')->get();

        return response()->json(
            [
                'user' => $user,
                'user_profile' => $user_profile,
                'followings' => $followings,
                'followers' => $followers,
            ],
            200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(AdminProfileUpdateRequest $request, $id)
    {
        $user = User::find($id);
        $user_profile = UserProfile::where('user_id', $user->id)->first();

        $user->name = $request->name;
        $user->department_id = $request->department_id;
        $user->beginner_flg = $request->beginner_flg;
        $user->email = $request->email;
        $user->entry_date = $request->entry_date;
        $user->gender = $request->gender;

        $user_profile->blood_type = $request->blood_type;
        $user_profile->birthday = $request->birthday;
        $user_profile->github_url = $request->github_url;
        $user_profile->qiita_url = $request->qiita_url;
        $user_profile->self_introduction = $request->self_introduction;


        DB::beginTransaction();
        try{
            $user->save();
            $user_profile->save();
            DB::commit();
            return response()->json(['UpdateUserResult' => true], 200);
        } catch (\Exception $e){
            DB::rollBack();
            return response()->json(['UpdateUserResult' => false, 'message' => $e], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);

        DB::beginTransaction();
        try{
            $user->deleted_at = Carbon::now();
            $user->save();
            DB::commit();
            return response()->json(['DestroyUserResult' => true], 200);
        } catch (\Exception $e){
            DB::rollBack();
            return response()->json(['DestroyUserResult' => false, 'message' => $e], 200);
        }

    }

    public function roles()
    {
        $users = User::with(['department'])->whereHas('role', function ($query) {
            $query->where('role', '=', '0');
        })->get();
        return response()->json(['users' => $users], 200);
    }

    public function registerNewRole(Request $request)
    {
        $users = collect([]);
        $request->merge(['status' => 'working']);
        if (isset($request->name)) {
            $users = SearchService::searchUser($request);
        }

        return view('admin/users/registerRolePage', compact('users'));
    }

    public function storeNewRole($id)
    {
        $user = User::with(['role'])->find($id);
        if (!is_null($user->deleted_at) && is_null($user->role)) {
            $userRole = UserRole::create([
                'user_id' => $id,
                'role' => 0,
            ]);
            return to_route('admin.users.role')->with('status', '登録しました');
        } else if ($user->role->role === 0) {
            return to_route('admin.users.role')->with('status', '既に登録済みです');
        } else {
            return to_route('admin.users.role')->with('status', '登録できないユーザーです');
        }
    }

    public function deleteAdminRole($id)
    {
        $userRole = UserRole::where('user_id', $id)->first();

        DB::beginTransaction();
        try{
            $userRole->delete();
            DB::commit();
            return response()->json(['destroyAdminUserRoleResult' => true], 200);
        } catch (\Exception $e){
            DB::rollBack();
            return response()->json(['destroyAdminUserRoleResult' => false, 'message' => $e], 200);
        }
    }
}
