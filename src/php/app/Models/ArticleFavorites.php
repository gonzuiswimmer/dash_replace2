<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Article;
use App\Models\User;

class ArticleFavorites extends Model
{
    protected $fillable = [
        'user_id',
        'article_id',
    ];

    use HasFactory;

    public function user(): BelongsTo
    {
        return $this->belongsTo('App\Models\User');
    }
    
    public function articles(): BelongsTo
    {

        return $this->belongsTo(Article::class, 'article_id');
    }
    
}
