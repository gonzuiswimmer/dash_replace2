<?php

namespace App\Services;

class CheckFormService
{
    // アサイン状況
    public static function checkAllocation($user)
    {

        if ($user->beginner_flg === null) {
            $allocation = '指定なし';
        }
        if ($user->beginner_flg === true) {
            $allocation = 'アサイン中';
        }
        if ($user->beginner_flg === false) {
            $allocation = '待機中';
        }

        return $allocation;
    }

    // 性別
    public static function checkGender($user)
    {
        if ($user->gender === 1) {
            $gender = '男性';
        } else {
            $gender = '女性';
        }

        return $gender;
    }

    // 血液型
    public static function checkBloodType($user_profile)
    {
        if ($user_profile->blood_type === 0) {
            $blood_type = '未設定';
        }
        if ($user_profile->blood_type === 1) {
            $blood_type = 'A型';
        }
        if ($user_profile->blood_type === 2) {
            $blood_type = 'B型';
        }
        if ($user_profile->blood_type === 3) {
            $blood_type = 'AB型';
        }
        if ($user_profile->blood_type === 4) {
            $blood_type = 'O型';
        }

        return $blood_type;
    }
}