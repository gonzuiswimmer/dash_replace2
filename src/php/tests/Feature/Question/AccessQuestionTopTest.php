<?php

namespace Tests\Feature\Question;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use App\Models\User;
use App\Models\UserRole;
use App\Models\Question;
use Illuminate\Support\Facades\Log;

class AccessQuestionTopTest extends TestCase
{
    use DatabaseTransactions;

    protected $user;
    protected $adminUser;

    public function setUp() :void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->adminUser = User::factory()->create();
    }

    public function test_認証状態であればQAトップページにアクセスできる()
    {
        $response = $this->actingAs($this->user);
        $response = $this->get('/questions');

        $response->assertStatus(200);
    }

    public function test_認証状態でなければQAトップページにアクセスできずログイン画面に遷移する()
    {
        $response = $this->get('/questions');

        $response->assertRedirect('/login');
    }

    public function test_一般ユーザーでログインすると、ナビゲーションメニューが一般仕様になる()
    {
        $response = $this->actingAs($this->user);
        $response = $this->get('/questions');

        $response->assertStatus(200)->assertSee('月報トップ');
    }

    public function test_QAトップページではquestionsのindexビューが表示されている()
    {
        $response = $this->actingAs($this->user);
        $response = $this->get('/questions');

        $response->assertStatus(200)->assertViewIs('questions.index')->assertSee('質問一覧');
    }

    public function test_QAトップページでは質問一覧と回答募集中の質問一覧と検索フォームがある()
    {
        $response = $this->actingAs($this->user);
        $response = $this->get('/questions');

        $response->assertStatus(200)->assertViewIs('questions.index')
        ->assertSee('回答募集中の質問一覧')
        ->assertSee('質問一覧')
        ->assertSee('Search');
    }

    public function test_QAトップページでは最新の投稿が表示されている()
    {
        $questions = Question::factory(3)->create();
        $response = $this->actingAs($this->user);
        $response = $this->get('/questions');

        $response->assertSee($questions[0]->title);
    }

    public function test_管理者権限のあるユーザーでログインすると、ナビゲーションメニューが管理者仕様になる()
    {
        $userRole = UserRole::factory()->create([
            'user_id' => $this->adminUser->id,
            'role' => 0,
        ]);

        $response = $this->actingAs($this->adminUser);
        $response = $this->get('/questions');

        $response->assertStatus(200)->assertSee('管理者登録');
    }

    // public function test_管理者権限のあるユーザーでなければ管理者サービス画面にアクセスできない()
    // {
    //     $userRole = UserRole::factory()->create([
    //         'user_id' => $this->adminUser->id,
    //         'role' => 1,
    //     ]);

    //     $response = $this->get('/admin/users');

    //     $response->assertRedirect('/login');
    // }
}
