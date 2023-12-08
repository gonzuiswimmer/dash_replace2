<?php

namespace Tests\Feature\Question;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Validator;
use Tests\TestCase;
use App\Http\Requests\QuestionRequest;

class CreateQuestionTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * カスタムリクエストのバリデーションテスト
     *
     * @param array 項目名の配列
     * @param array 値の配列
     * @param boolean 期待値
     * @dataProvider dataQuestionCreate
     */
    public function testCreateQuestion(array $keys, array $values, bool $expect){
        // 入力項目の配列($keys)と値の配列($values)から、連装配列を生成する
        $dataList = array_combine($keys,$values);

        $request = new QuestionRequest();
        // フォームリクエストで定義したルールを取得
        $rules = $request->rules();
        // validatorファサードでバリデーターのインスタンスを取得、その際に入力情報とバリデーションルールを引数で渡す
        $validator = Validator::make($dataList,$rules);
        // 入力情報がバリデーションルールを満たしている場合はtrue,そうでない場合はfalseが返る
        $result = $validator->passes();
        // 期待値($expect)と結果($result)を比較
        $this->assertEquals($expect,$result);

    }

    public function dataQuestionCreate(){
        return [
            'OK' => [
                ['title','body','tags'],
                ['testTitle','this is the test body',array('tag1','tag2','tag3')],
                true
            ],
            'title必須エラー' => [
                ['title','body','tags'],
                [null,'this is the test body',array('tag1','tag2','tag3')],
                false
            ],
            'title形式エラー' => [
                ['title','body','tags'],
                [1,'this is the test body',array('tag1','tag2','tag3')],
                false
            ],
            'title最大文字数エラー' => [
                ['title','body','tags'],
                [str_repeat('a',256),'this is the test body',array('tag1','tag2','tag3')],
                false
            ],
            'title最大文字数OK' => [
                ['title','body','tags'],
                [str_repeat('a',255),'this is the test body',array('tag1','tag2','tag3')],
                true
            ],
            'body必須エラー' => [
                ['title','body','tags'],
                ['testTitle',null,array('tag1','tag2','tag3')],
                false
            ],
            'body形式エラー' => [
                ['title','body','tags'],
                ['testTitle',1,array('tag1','tag2','tag3')],
                false
            ],
            'body最大文字数エラー' => [
                ['title','body','tags'],
                ['testTitle',str_repeat('a',256),array('tag1','tag2','tag3')],
                false
            ],
            'body最大文字数OK' => [
                ['title','body','tags'],
                ['testTitle',str_repeat('a',255),array('tag1','tag2','tag3')],
                true
            ],
            'tags必須エラー' => [
                ['title','body','tags'],
                ['testTitle','this is the test body',null],
                false
            ],
            'tags形式エラー' => [
                ['title','body','tags'],
                ['testTitle','this is the test body','tags'],
                false
            ],
        ];
    }
}
