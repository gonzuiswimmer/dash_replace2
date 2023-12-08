<?php

namespace App\Models;

use App\Models\MonthlyReport;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MonthlyWorkingProcess extends Model
{
    use HasFactory;

    // monthly_reportsテーブルとの関連付け
    public function monthlyReports() {
        return $this->belongsTo(MonthlyReport::class);
    }

    // 初期値を全てfalseに設定する
    protected $attributes = [
        'process_definition' => false,
        'process_design' => false,
        'process_implementation' => false,
        'process_test' => false,
        'process_operation' => false,
        'process_analysis' => false,
        'process_training' => false,
        'process_structure' => false,
        'process_trouble' => false,
    ];
}
