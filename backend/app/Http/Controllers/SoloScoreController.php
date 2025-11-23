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
            'score' => 'required|integer',
            'time_taken' => 'required|integer',
        ]);

        // Update existing score only if the new score is higher
        $existingScore = SoloScore::where('player_name', $validated['player_name'])->first();

        if ($existingScore) {
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

    public function leaderboard()
    {
        $scores = SoloScore::orderByDesc('score')
            ->orderBy('time_taken')
            ->limit(10)
            ->get();

        return response()->json($scores);
    }
}
