<?php

namespace App\Http\Controllers;

use App\Models\Song;
use Illuminate\Http\Request;

class SongController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Song::all();
    }

    /**
     * Get a random set of songs for a game.
     */
    public function random(Request $request)
    {
        $limit = $request->query('limit', 10);
        $language = $request->query('language');

        $query = Song::query();

        if ($language) {
            $query->where('language', $language);
        }

        // Get random songs
        $songs = $query->inRandomOrder()->limit($limit)->get();

        // Transform audio_url to full URL
        $songs->transform(function ($song) {
            $song->audio_url = asset('storage/' . $song->file_path);
            return $song;
        });

        return response()->json($songs);
    }
}
