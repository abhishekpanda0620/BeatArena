<?php

namespace Database\Seeders;

use App\Models\Song;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class SongSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jsonPath = database_path('data/songs.json');

        if (!File::exists($jsonPath)) {
            $this->command->error("Songs JSON file not found at: $jsonPath");
            return;
        }

        $songs = json_decode(File::get($jsonPath), true);

        if (!$songs) {
            $this->command->error("Failed to decode songs JSON.");
            return;
        }

        foreach ($songs as $songData) {
            // Remove search_query as it's not in the database schema
            unset($songData['search_query']);
            
            Song::updateOrCreate(
                [
                    'title' => $songData['title'],
                    'artist' => $songData['artist'],
                ],
                $songData
            );
        }
        
        $this->command->info('Songs seeded successfully from JSON.');
    }
}
