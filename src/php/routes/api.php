<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AdminController;

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

// nuxt（フロントエンド）とのapi通信でSPA 認証を行う
Route::prefix('auth')->group(function(){
    Route::post('/login',[LoginController::class,'login']);
    Route::post('/logout',[LoginController::class,'logout']);
});

// laravel-sanctumで認証チェック
Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', function(Request $request){
        return $request->user();
    });
    Route::get('top',[UserController::class,'index']);

    // 管理者関連のルート
    Route::prefix('/admin')->middleware('judgeApiAdmin')->group(function () {
        Route::prefix('/users')->group(function () {
            Route::get('/', [AdminController::class, 'users'])->name('admin.users');
            Route::get('/getDepartments',[AdminController::class,'getDepartments']);
            Route::post('/store', [AdminController::class, 'store'])->name('admin.users.store');
            Route::get('/edit/{id}', [AdminController::class, 'edit'])->name('admin.users.edit');
            Route::patch('/update/{id}', [AdminController::class, 'update'])->name('admin.users.update');
            Route::patch('/destroy/{id}', [AdminController::class, 'destroy'])->name('admin.users.destroy');

            Route::get('/roles', [AdminController::class, 'roles'])->name('admin.users.role');
            Route::get('/roles/new', [AdminController::class, 'registerNewRole'])->name('admin.users.registerNewRole');
            Route::post('/roles/new/{id}', [AdminController::class, 'storeNewRole'])->name('admin.users.storeNewRole');
            Route::delete('/roles/delete/{id}', [AdminController::class, 'destroy'])->name('admin.users.delete');
        });
        Route::prefix('/announcement')->group(function () {
            Route::get('/showAll', [AnnouncementController::class, 'showAll'])->name('admin.announcement.showAll');
            Route::get('/create', [AnnouncementController::class, 'create'])->name('admin.announcement.create');
            Route::post('/store', [AnnouncementController::class, 'store'])->name('admin.announcement.store');
        });
        Route::prefix('/inquiry')->group(function () {
            Route::get('/showAll', [AdminInquiryController::class, 'showAll'])->name('admin.inquiry.showAll');
            Route::get('/mailList', [AdminInquiryController::class, 'mailList'])->name('admin.inquiry.mailList');
                Route::patch('/store', [AdminInquiryController::class, 'update'])->name('admin.inquiry.update');
        });
    });

});
Route::fallback(function(){ //存在しないURLは自動的に404エラーにリダイレクトさせる
    return redirect(abort(404));
});
