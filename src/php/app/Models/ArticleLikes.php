<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArticleLikes extends Model
{

    use HasFactory;

    protected $fillable = [
        'user_id',
        'article_id',
        'is_deleted',
    ];

    // この投稿に対していいねしたユーザーを取得
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // このユーザーがいいねした投稿を取得
    public function article()
    {
        return $this->belongsTo(Article::class);
    }

}
