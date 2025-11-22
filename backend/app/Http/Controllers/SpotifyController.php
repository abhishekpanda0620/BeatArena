<?php

namespace App\Http\Controllers;

use App\Services\SpotifyService;
use Illuminate\Http\Request;

class SpotifyController extends Controller
{
    protected $spotify;

    public function __construct(SpotifyService $spotify)
    {
        $this->spotify = $spotify;
    }

    /**
     * Search for tracks
     */
    public function search(Request $request)
    {
        $query = $request->query('q', 'popular songs');
        $limit = $request->query('limit', 20);

        $tracks = $this->spotify->searchTracks($query, $limit);

        return response()->json($tracks);
    }

    /**
     * Get random tracks
     */
    public function random(Request $request)
    {
        $genre = $request->query('genre');
        $limit = $request->query('limit', 10);

        $tracks = $this->spotify->getRandomTracks($genre, $limit);

        return response()->json($tracks);
    }

    /**
     * Get track by ID
     */
    public function show($id)
    {
        $track = $this->spotify->getTrack($id);

        return response()->json($track);
    }
}
