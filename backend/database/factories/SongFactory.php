<?php

namespace Database\Factories;

use App\Models\Song;
use Illuminate\Database\Eloquent\Factories\Factory;

class SongFactory extends Factory
{
    protected $model = Song::class;

    public function definition(): array
    {
        $language = $this->faker->randomElement(['en', 'hi']);
        $title = $this->faker->words(3, true);
        $artist = $this->faker->name();
        
        // Generate 4 options including the correct one
        $correctOption = "{$title} - {$artist}";
        $options = [
            $correctOption,
            $this->faker->words(3, true) . ' - ' . $this->faker->name(),
            $this->faker->words(3, true) . ' - ' . $this->faker->name(),
            $this->faker->words(3, true) . ' - ' . $this->faker->name(),
        ];
        shuffle($options);

        return [
            'title' => $title,
            'artist' => $artist,
            'file_path' => 'songs/' . $language . '/test_' . $this->faker->unique()->numberBetween(1, 10000) . '.mp3',
            'language' => $language,
            'difficulty' => $this->faker->randomElement(['easy', 'medium', 'hard']),
            'options' => $options,
            'correct_option' => $correctOption,
        ];
    }
}
