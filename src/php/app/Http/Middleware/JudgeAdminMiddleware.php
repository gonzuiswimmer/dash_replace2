<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JudgeAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if(Auth::check()){
            // Auth::userのuser_roleが0(管理者)であれば、次の処理へ移行。
            $judge = Auth::user()->role;
            if(is_null($judge)){
                return redirect()->route('login');
            }else if($judge->role === 0){
                return $next($request);
            }
        }
        return redirect()->route('login');
    }
}
