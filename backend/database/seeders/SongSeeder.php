<?php

namespace Database\Seeders;

use App\Models\Song;
use Illuminate\Database\Seeder;

class SongSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $songs = [
            [
                'title' => 'Shape of You',
                'artist' => 'Ed Sheeran',
                'file_path' => 'songs/shape_of_you.mp3',
                'language' => 'en',
                'difficulty' => 'easy',
                'options' => ['Shape of You', 'Perfect', 'Castle on the Hill', 'Galway Girl'],
                'correct_option' => 'Shape of You'
            ],
            [
                'title' => 'Blinding Lights',
                'artist' => 'The Weeknd',
                'file_path' => 'songs/blinding_lights.mp3',
                'language' => 'en',
                'difficulty' => 'easy',
                'options' => ['Starboy', 'Blinding Lights', 'Save Your Tears', 'In Your Eyes'],
                'correct_option' => 'Blinding Lights'
            ],
            [
                'title' => 'Levitating',
                'artist' => 'Dua Lipa',
                'file_path' => 'songs/levitating.mp3',
                'language' => 'en',
                'difficulty' => 'medium',
                'options' => ['Don\'t Start Now', 'Physical', 'Levitating', 'New Rules'],
                'correct_option' => 'Levitating'
            ],
             [
                'title' => 'Kesariya',
                'artist' => 'Arijit Singh',
                'file_path' => 'songs/kesariya.mp3',
                'language' => 'hi',
                'difficulty' => 'easy',
                'options' => ['Kesariya', 'Apna Bana Le', 'Deva Deva', 'Rasiya'],
                'correct_option' => 'Kesariya'
            ],
            [
                'title' => 'Chaleya',
                'artist' => 'Arijit Singh',
                'file_path' => 'songs/chaleya.mp3',
                'language' => 'hi',
                'difficulty' => 'easy',
                'options' => ['Jhoome Jo Pathaan', 'Chaleya', 'Not Ramaiya Vastavaiya', 'Besharam Rang'],
                'correct_option' => 'Chaleya'
            ]
        ];

        foreach ($songs as $song) {
            Song::create($song);
        }
    }
}
