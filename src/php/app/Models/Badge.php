<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Badge extends Model
{
    use HasFactory;

    protected $fillable = [
        'badge_type',
        'badge_color',
        'badge_value',
    ];

    // Userへの関連を定義
    public function user(){
        return $this->belongsToMany(User::class,'user_badges');
    }
}
