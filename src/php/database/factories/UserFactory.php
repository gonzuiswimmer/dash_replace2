<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Faker\Provider\DataTime;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {

        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'employee_code' => fake()->unique()->randomNumber(4,true),
            'beginner_flg' => true,
            'deleted_at' => null,
            'created_at' => Carbon::yesterday(),
            'updated_at' => Carbon::now(),
            'department_id' => fake()->numberBetween(1,8),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
