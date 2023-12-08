<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Article;

class ArticleComments extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'comment',
        'article_id',
        'is_deleted',
    ];

    // public function article(): BelongsTo
    public function articles(): BelongsTo
    {
        return $this->belongsTo('App\Models\Article');
    }

    public function user()
{
    return $this->belongsTo(User::class, 'user_id');
}
}
