<?php

namespace Tests\Feature\Question;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use App\Models\User;


class PostNewQuestionTest extends TestCase
{
    protected $user;
    use DatabaseTransactions;

    public function setUp() :void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }

    /**
     * 正常系：新規Q&Aを下書き投稿するテスト
     *
     * @return void
     */
    public function test_postNewQuestionAsDraft()
    {
        $response = $this->actingAs($this->user);
        $response = $this->post('/questions',[
            'title' => 'testTitle',
            'body' => 'this is the test body',
            'tags' => array('tag1','tag2','tag3'),
            'saveAsDraft' => 'saveAsDraft',
        ]);

        $response->assertRedirect('/questions')->assertSessionHas('status','投稿を作成しました。');
    }

    /**
     * 正常系：新規Q&Aを保存して公開処理するテスト
     *
     * @return void
     */
    public function test_postNewQuestionAsPublic()
    {
        $response = $this->actingAs($this->user);
        $response = $this->post('/questions',[
            'title' => 'testTitle',
            'body' => 'this is the test body',
            'tags' => array('tag1','tag2','tag3'),
            'create' => 'create',
        ]);

        $response->assertRedirect('/questions')->assertSessionHas('status','投稿を作成しました。');
    }

    /**
     * 異常系：新規Q&Aが作成できず、リダイレクトするテスト
     *
     * @return void
     */
    public function test_canNotPostNewQuestion()
    {
        $response = $this->actingAs($this->user);
        $response = $this->post('/questions',[
            'title' => 2,
            'body' => 'this is the test body',
            'tags' => array('tag1','tag2','tag3'),
            'create' => 'create',
        ]);

        $response->assertRedirect('/questions')->assertSessionHas('status','エラー：更新処理に失敗しました。');
    }
}
