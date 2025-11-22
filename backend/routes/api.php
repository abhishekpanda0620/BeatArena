<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SongController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/songs', [SongController::class, 'index']);
Route::get('/songs/random', [SongController::class, 'random']);

// Spotify routes
Route::prefix('spotify')->group(function () {
    Route::get('/search', [App\Http\Controllers\SpotifyController::class, 'search']);
    Route::get('/random', [App\Http\Controllers\SpotifyController::class, 'random']);
    Route::get('/track/{id}', [App\Http\Controllers\SpotifyController::class, 'show']);
});
