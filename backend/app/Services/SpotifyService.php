<?php

namespace App\Services;

use SpotifyWebAPI\SpotifyWebAPI;
use SpotifyWebAPI\Session;

class SpotifyService
{
    protected $api;
    protected $session;

    public function __construct()
    {
        $this->session = new Session(
            config('services.spotify.client_id'),
            config('services.spotify.client_secret')
        );

        $this->session->requestCredentialsToken();
        
        $this->api = new SpotifyWebAPI();
        $this->api->setAccessToken($this->session->getAccessToken());
    }

    /**
     * Search for tracks
     */
    public function searchTracks(string $query, int $limit = 20)
    {
        $results = $this->api->search($query, 'track', [
            'limit' => $limit,
            'market' => 'US'
        ]);

        return collect($results->tracks->items)->filter(function ($track) {
            return $track->preview_url !== null;
        })->values();
    }

    /**
     * Get random tracks from a genre/playlist
     */
    public function getRandomTracks(string $genre = null, int $limit = 10)
    {
        // Search for top tracks or by genre
        $query = $genre ? "genre:{$genre}" : "year:2020-2024";
        
        $results = $this->api->search($query, 'track', [
            'limit' => 50,
            'market' => 'US'
        ]);

        $tracks = collect($results->tracks->items)
            ->filter(fn($track) => $track->preview_url !== null)
            ->shuffle()
            ->take($limit)
            ->values();

        return $tracks;
    }

    /**
     * Get track by ID
     */
    public function getTrack(string $spotifyId)
    {
        return $this->api->getTrack($spotifyId);
    }

    /**
     * Format track for database
     */
    public function formatTrackForDB($track, array $options = [])
    {
        return [
            'title' => $track->name,
            'artist' => $track->artists[0]->name,
            'spotify_id' => $track->id,
            'preview_url' => $track->preview_url,
            'album_art' => $track->album->images[0]->url ?? null,
            'file_path' => null, // Not used for Spotify tracks
            'language' => $options['language'] ?? 'en',
            'difficulty' => $options['difficulty'] ?? 'medium',
            'options' => $options['options'] ?? [],
            'correct_option' => $track->name,
        ];
    }
}
