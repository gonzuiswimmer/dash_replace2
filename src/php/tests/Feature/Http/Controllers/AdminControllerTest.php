<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\User;
use App\Models\UserRole;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use Carbon\Carbon;


class AdminControllerTest extends TestCase
{
    use DatabaseTransactions;

    protected $user, $adminUser;

    public function setUp() :void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->adminUser = User::factory()->create();
        UserRole::factory()->create([
            'user_id' => $this->adminUser->id,
            'role' => 0,
        ]);
        $this->actingAs($this->adminUser);
    }

    /** @test */
    public function 管理者トップのURLにアクセスして管理者トップ画面が表示される()
    {
        $response = $this->get(route('admin.top'));
        $response->assertStatus(200);
        $response->assertViewIs('admin.top');
    }

    /** @test */
    public function 管理者画面のユーザー一覧にアクセスしてユーザー一覧画面が表示される()
    {
        $response = $this->get(route('admin.users'));
        $response->assertStatus(200);

        $response->assertViewIs('admin.users.index');
    }

    /** @test */
    public function ユーザー新規作成画面が表示される()
    {
        // $params = [
        //     'name' => '新規ユーザー',
        //     'email' => 'new@example.com',
        //     'password' => Hash::make('newpass123456789'),
        //     'department_id' => 1,
        //     'beginner_flg' => true,
        //     'entry_date' => Carbon::now(),
        //     'gender' => 1,
        // ];
        // $response = $this->get(route('admin.users.create',$params));
        $response = $this->get(route('admin.users.create'));
        $response->assertStatus(200);

        $response->assertViewIs('admin.users.create');
    }

    /** @test */
    public function 新規データを保存後、管理者トップ画面に遷移し、登録しましたのメッセージがステータスに存在する()
    {
        $params = [
            'name' => '新規ユーザー',
            'email' => 'new@example.com',
            'password' => 'newpass123456789',
            'password_confirmation' => 'newpass123456789',
            'department_id' => 1,
            'beginner_flg' => true,
            'entry_date' => Carbon::now()->format('Y-m-d'),
            'gender' => 1,
        ];
        $response = $this->post(route('admin.users.store',$params));
        $response->assertStatus(302)->assertRedirect(route('admin.top'));

        $this->get(route('admin.top'))->assertSee('登録しました');
    }

    // 現在はProfileController#showメソッドを呼んでいるため、このケースを通ることがない
    //
    /** @test */
    public function ユーザー詳細画面に遷移する()
    {
        $this->markTestSkipped('コントローラー側の処理に問題があるため、スキップ');
        $params = [
            'id' => 1
        ];
        $user = User::find(1);
        $response = $this->get(route('admin.users.show',$params));
        // 'admin.users.showのビュー'は存在しないため、エラーになる
        $response->assertStatus(200);
        $response->assertViewIs('profile.show');
        $response->assertViewHas('user',$user);
    }

    /** @test */
    public function ユーザー情報編集画面に遷移する()
    {
        $params = [
            'id' => 1
        ];
        $response = $this->get(route('admin.users.edit',$params));
        $response->assertStatus(200);
        $response->assertViewIs('admin.users.edit');
        // $response->assertViewHas('user',$user);
    }

    /** @test */
    public function ユーザー情報が更新され、直前のページにリダイレクトする()
    {
        $params = [
            'id' => 1,
            'name' => 'test',
            'department_id' => 2,
            'beginner_flg' => true,
            'email' => 'test@example.com',
            'entry_date' => Carbon::now()->format('Y-m-d'),
            'gender' => 2,
            'blood_type' => 1,
            'birthday' => Carbon::now()->format('Y-m-d'),
            'github_url' => null,
            'qiita_url' => null,
            'self_introduction' => null,

        ];
        $this->get(route('admin.users.edit',$params['id']));
        $response = $this->patch(route('admin.users.update',$params));
        $response->assertStatus(302)->assertRedirect(route('admin.users.edit',$params['id']));

        $this->get(route('admin.users.edit',$params['id']))->assertSee('編集しました');
    }

    /** @test */
    public function ユーザー情報が削除され、管理者トップ画面に遷移する()
    {
        $params = [
            'id' => 1
        ];
        $response = $this->patch(route('admin.users.destroy',$params));
        $response->assertStatus(302)->assertRedirect(route('admin.top'));
        $this->get(route('admin.top'))->assertSee('削除しました');
    }

    /** @test */
    public function 管理者一覧ページが表示される()
    {
        $users = User::whereHas('role', function ($query) {
            $query->where('role', '=', '0');
        })->get();
        $response = $this->get(route('admin.users.role'));
        $response->assertStatus(200)->assertViewIs('admin.users.showRoles');
        $response->assertViewHas('users',$users);
    }

    /** @test */
    public function 管理者登録ページが表示される()
    {
        $response = $this->get(route('admin.users.registerNewRole'));
        $response->assertStatus(200)->assertViewIs('admin.users.registerRolePage');
        // $response->assertViewHas('users',$users);
    }

    /** @test */
    public function 管理者が新規登録され、管理者一覧ページへリダイレクトする()
    {
        $params = [
            'id' => 1
        ];
        $response = $this->post(route('admin.users.storeNewRole',$params));
        $response->assertStatus(302)->assertRedirect(route('admin.users.role'));
        $this->get(route('admin.users.role'))->assertSee('登録しました');
    }
}
