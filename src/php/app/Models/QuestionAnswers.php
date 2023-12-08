<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Question;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QuestionAnswers extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'answer',
        'question_id',
        'is_reply',
        'reply_parent_id',
        'is_deleted',
    ];

    // Questionへの関連を定義
    public function question(){
        return $this->belongsTo(Question::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo('App\Models\User');
    }
//     public function isReply()
// {
//     return $this->is_reply;
// }
public function replies()
{
    return $this->hasMany(QuestionAnswers::class, 'reply_parent_id');
}
}
