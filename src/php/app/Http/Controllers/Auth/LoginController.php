<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;



class LoginController extends Controller
{
    /**
     * ログイン
     *
     * @param  mixed $request
     * @return void
     */
    public function login(LoginRequest $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (auth()->attempt($credentials)) {
            $role = '';
            $user = User::with(['role'])->find(Auth::id());
            // 管理者ユーザーか一般ユーザーか判別してフロントに渡す
            if(isset($user->role) && $user->role->role == 0) {
                $role = 'admin';
            } else {
                $role = 'other';
            };
            return response()->json(['role'=>$role], 200);
        }

        return response()->json(['message' => 'ユーザーが見つかりません。'], 422);
    }

    /**
     * ログアウト
     *
     * @param  mixed $request
     * @return void
     */
    public function logout(Request $request)
    {
        // ログアウトする
        Auth::logout();
        // レスポンスを返す
        return response()->json(['message' => 'Logged out'], 200);
    }
}
