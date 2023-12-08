<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\ArticleComments;
use App\Models\ArticleFavorites;
use App\Models\Tag;

class Article extends Model
{
    use HasFactory;


    // ArticleLikesへの関連を定義
    public function articleLikes(){
        return $this->belongsToMany(User::class,'article_likes')->withTimestamps();
    }

    // ArticleTagsへの関連を定義
    public function articleTags(){
        return $this->belongsToMany(Tag::class,'article_tags')->withTimestamps();
    }

    // Tagへの関連を定義
    public function tags(){
        return $this->belongsToMany(Tag::class,'article_tags')->where('is_deleted','=',false)->withTimestamps();
    }

    protected $fillable = [
        'user_id',
        'title',
        'body',
        'article_category_id',
        'comments_count',
        'is_deleted',
        'shipped_at'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo('App\Models\User');
    }

    public function articleComments(): HasMany
    {
        return $this->hasMany('App\Models\ArticleComments');
    }

    // public function articleFavorites(): HasMany
    // {
    //     return $this->hasMany('App\Models\ArticleFavorites');
    // }
    public function articleFavorites(): HasMany
    {
        return $this->hasMany(ArticleFavorites::class, 'article_id');
    }

    public function isFavoritedByUser($user)
    {
        return $this->articleFavorites()
                    ->where('user_id', $user->id)
                    ->where('is_deleted', false)
                    ->exists();
    }

    public function articleCategory(): BelongsTo
{
    return $this->belongsTo(ArticleCategories::class, 'article_category_id', 'id');
}

public function likes(): HasMany
{
    return $this->hasMany(ArticleLikes::class);
} 
 // いいね数をカウントする関数を定義
    public function likeCount()
    {
        return $this->likes()->where('is_deleted', false)->count();
    }

    // この記事に対して、指定されたユーザーがいいねしたかどうかを判定する関数
    public function isLikedByUser($userId)
    {
        return $this->likes()->where('user_id', $userId)->where('is_deleted', false)->exists();
    }
    

}
