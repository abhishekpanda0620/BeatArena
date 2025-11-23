<?php

namespace App\Http\Controllers;

use App\Models\Challenge;
use App\Models\ChallengeResult;
use App\Models\Song;
use Illuminate\Http\Request;

class ChallengeController extends Controller
{
    /**
     * Create a new challenge
     */
    public function create(Request $request)
    {
        $validated = $request->validate([
            'creator_name' => 'required|string|max:50',
            'language' => 'required|in:en,hi',
        ]);

        // Get 5 random songs for this language
        $songs = Song::where('language', $validated['language'])
            ->inRandomOrder()
            ->limit(5)
            ->get();

        if ($songs->count() < 5) {
            return response()->json([
                'error' => 'Not enough songs available for this language'
            ], 400);
        }

        // Create challenge
        $challenge = Challenge::create([
            'challenge_code' => Challenge::generateUniqueCode(),
            'creator_session_id' => session()->getId(),
            'creator_name' => $validated['creator_name'],
            'language' => $validated['language'],
            'song_ids' => $songs->pluck('id')->toArray(),
            'status' => 'waiting',
        ]);

        // Transform songs with audio URLs
        $songs->transform(function ($song) {
            $song->audio_url = asset('storage/' . $song->file_path);
            return $song;
        });

        return response()->json([
            'challenge' => $challenge,
            'songs' => $songs,
        ], 201);
    }

    /**
     * Get challenge details by code
     */
    public function show($code)
    {
        $challenge = Challenge::with('results')
            ->where('challenge_code', $code)
            ->first();

        if (!$challenge) {
            return response()->json(['error' => 'Challenge not found'], 404);
        }

        // Get songs for this challenge
        $songs = Song::whereIn('id', $challenge->song_ids)->get();
        $songs->transform(function ($song) {
            $song->audio_url = asset('storage/' . $song->file_path);
            return $song;
        });

        return response()->json([
            'challenge' => $challenge,
            'songs' => $songs,
            'results' => $challenge->results()->orderByDesc('score')->orderBy('time_taken')->get(),
            'winner' => $challenge->getWinner(),
        ]);
    }

    /**
     * Submit result for a challenge
     */
    public function submit(Request $request, $code)
    {
        $validated = $request->validate([
            'player_name' => 'required|string|max:50',
            'score' => 'required|integer|min:0',
            'time_taken' => 'required|integer|min:0',
            'answers' => 'nullable|array',
        ]);

        $challenge = Challenge::where('challenge_code', $code)->first();

        if (!$challenge) {
            return response()->json(['error' => 'Challenge not found'], 404);
        }

        $sessionId = session()->getId();

        // Check if this session already submitted
        $existing = ChallengeResult::where('challenge_id', $challenge->id)
            ->where('player_session_id', $sessionId)
            ->first();

        if ($existing) {
            return response()->json([
                'error' => 'You have already submitted a result for this challenge'
            ], 409);
        }

        // Create result
        $result = ChallengeResult::create([
            'challenge_id' => $challenge->id,
            'player_session_id' => $sessionId,
            'player_name' => $validated['player_name'],
            'score' => $validated['score'],
            'time_taken' => $validated['time_taken'],
            'answers' => $validated['answers'] ?? null,
            'completed_at' => now(),
        ]);

        // Update challenge status
        if ($challenge->status === 'waiting') {
            $challenge->update(['status' => 'in_progress']);
        }

        // Get all results and determine winner
        $allResults = $challenge->results()->orderByDesc('score')->orderBy('time_taken')->get();
        $winner = $challenge->getWinner();

        return response()->json([
            'result' => $result,
            'all_results' => $allResults,
            'winner' => $winner,
            'is_winner' => $winner && $winner->id === $result->id,
        ], 201);
    }
}
