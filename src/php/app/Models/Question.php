<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Tag;
use App\Models\QuestionAnswers;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'body',
        'answer_count',
        'is_deleted',
        'shipped_at'
    ];

    // Userへの関連を定義
    public function user(){
        return $this->belongsTo(User::class);
    }
    // Tagへの関連を定義
    public function tags(){
        return $this->belongsToMany(Tag::class,'question_tags')->where('is_deleted','=',false)->withTimestamps();
    }
    // QuestionAnswersへの関連を定義
    public function questionAnswers(){
        return $this->hasMany(QuestionAnswers::class);
    }
}
