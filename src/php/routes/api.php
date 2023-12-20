<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Api\UserController;

use function Pest\Laravel\json;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// nuxtとのapi通信
// SPA 認証
Route::prefix('auth')->group(function(){
    Route::post('/login',[LoginController::class,'login']);
    Route::post('/logout',[LoginController::class,'logout']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', function(Request $request){
        return $request->user();
    });
    Route::get('top',[UserController::class,'index']);
});
