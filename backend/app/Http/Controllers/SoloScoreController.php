<?php

namespace App\Http\Controllers;

use App\Models\SoloScore;
use Illuminate\Http\Request;

class SoloScoreController extends Controller
{
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'player_name' => 'required|string|max:50',
            'language' => 'required|in:en,hi',
            'score' => 'required|integer',
            'time_taken' => 'required|integer',
        ]);

        // Check if username already exists for this language
        $existingScore = SoloScore::where('player_name', $validated['player_name'])
            ->where('language', $validated['language'])
            ->first();

        if ($existingScore) {
            // Update only if new score is higher
            if ($validated['score'] > $existingScore->score) {
                $existingScore->update([
                    'score' => $validated['score'],
                    'time_taken' => $validated['time_taken'],
                ]);
            }
        } else {
            SoloScore::create($validated);
        }

        return response()->json(['message' => 'Score submitted successfully']);
    }

    public function leaderboard(Request $request)
    {
        $language = $request->query('language', 'en');
        
        $scores = SoloScore::where('language', $language)
            ->orderByDesc('score')
            ->orderBy('time_taken')
            ->limit(10)
            ->get();

        return response()->json($scores);
    }
}
