<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question>
 */
class QuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'title' => fake()->text(20),
            'body' => fake()->text(100),
            'shipped_at' => Carbon::now(),
            'is_deleted' => false,
            'answer_count' => 0,
            'created_at' => Carbon::yesterday(),
            'updated_at' => Carbon::now(),
        ];
    }
}
