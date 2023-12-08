<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Article;

class ArticleCategories extends Model
{
    use HasFactory;

    // public function articles(): BelongsTo
    // {
    //     return $this->belongsTo('App\Models\Article');
    // }
    public function articles(): HasMany
    {
        // return $this->hasMany(Article::class, 'article_category_id');
        return $this->hasMany(Article::class, 'article_category_id', 'id');
    }
}
