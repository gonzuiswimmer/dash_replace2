<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Relations\HasMany;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class MonthlyReport extends Model
{
    use HasFactory;
    
    // userへの関連を定義
    public function user() {
        return $this->belongsTo(User::class);
    }

    // tagへの関連を定義
    public function tags() {
        return $this->belongsToMany(Tag::class, 'monthly_report_tags')->withTimestamps();
    }

    // monthly_working_processへの関連を定義
    public function monthlyWorkingProcesses() {
        return $this->hasOne(MonthlyWorkingProcess::class);
    }

    // 日付フォーマットエラー回避のための定義
    protected $dates = [
        'shipped_at',
        'target_month',
        'entry_date',
    ];

    protected $fillable = [
        'target_month',
        'assign',
        'project_summary',
        'business_content',
        'looking_back',
        'next_month_goals',
        'user_id',
        'is_deleted',
        'shipped_at',
    ];
    // MonthlyReportLikesへの関連を定義
    public function monthlyReportLikes(){
        return $this->belongsToMany(User::class,'monthly_report_likes')->withTimestamps();
    }
    public function monthlyReportComments(): HasMany
    {
        return $this->hasMany('App\Models\MonthlyReportComments');
    }


}
