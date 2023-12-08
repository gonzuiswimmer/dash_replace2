<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\MonthlyReport;


class MonthlyReportComments extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'comment',
        'monthly_report_id',
    ];

    public function monthlyReports()
    {
        return $this->belongsTo(MonthlyReport::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo('App\Models\User');
    }
}
