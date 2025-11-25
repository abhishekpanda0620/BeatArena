<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Challenge;
use App\Models\Song;

class ChallengeTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_challenge()
    {
        // Seed songs first - need at least 5 songs
        Song::factory()->count(5)->create(['language' => 'en']);

        $response = $this->postJson('/api/challenges/create', [
            'creator_name' => 'Test Player',
            'language' => 'en',
        ]);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'challenge' => [
                    'challenge_code',
                    'creator_name',
                    'language',
                    'status',
                ],
                'songs',
            ]);

        $this->assertDatabaseHas('challenges', [
            'creator_name' => 'Test Player',
            'language' => 'en',
        ]);
    }

    public function test_create_challenge_validation()
    {
        $response = $this->postJson('/api/challenges/create', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['creator_name', 'language']);
    }

    public function test_can_retrieve_challenge()
    {
        // Create songs for the challenge
        $songs = Song::factory()->count(5)->create(['language' => 'en']);

        $challenge = Challenge::create([
            'challenge_code' => 'TEST01',
            'creator_session_id' => 'test-session',
            'creator_name' => 'Creator',
            'language' => 'en',
            'song_ids' => $songs->pluck('id')->toArray(),
            'status' => 'waiting',
        ]);

        $response = $this->getJson("/api/challenges/{$challenge->challenge_code}");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'challenge' => [
                    'id',
                    'challenge_code',
                    'creator_name',
                ],
                'songs',
                'results',
            ]);
    }

    public function test_retrieve_non_existent_challenge()
    {
        $response = $this->getJson('/api/challenges/INVALD');

        $response->assertStatus(404);
    }

    public function test_can_submit_score()
    {
        $songs = Song::factory()->count(5)->create(['language' => 'en']);

        $challenge = Challenge::create([
            'challenge_code' => 'TEST02',
            'creator_session_id' => 'test-session',
            'creator_name' => 'Creator',
            'language' => 'en',
            'song_ids' => $songs->pluck('id')->toArray(),
            'status' => 'waiting',
        ]);

        $response = $this->postJson("/api/challenges/{$challenge->challenge_code}/submit", [
            'player_name' => 'Player 2',
            'score' => 100,
            'time_taken' => 50,
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('challenge_results', [
            'challenge_id' => $challenge->id,
            'player_name' => 'Player 2',
            'score' => 100,
        ]);
    }

    public function test_prevent_duplicate_submission()
    {
        $songs = Song::factory()->count(5)->create(['language' => 'en']);

        $challenge = Challenge::create([
            'challenge_code' => 'TEST03',
            'creator_session_id' => 'test-session',
            'creator_name' => 'Creator',
            'language' => 'en',
            'song_ids' => $songs->pluck('id')->toArray(),
            'status' => 'waiting',
        ]);

        $this->postJson("/api/challenges/{$challenge->challenge_code}/submit", [
            'player_name' => 'Player 2',
            'score' => 100,
            'time_taken' => 50,
        ]);

        $response = $this->postJson("/api/challenges/{$challenge->challenge_code}/submit", [
            'player_name' => 'Player 2',
            'score' => 150,
            'time_taken' => 40,
        ]);

        $response->assertStatus(409);
    }
}
