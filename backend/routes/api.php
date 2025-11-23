<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SongController;
use App\Http\Controllers\ChallengeController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Songs
Route::get('/songs', [SongController::class, 'index']);
Route::get('/songs/random', [SongController::class, 'random']);

// Challenges
Route::post('/challenges/create', [ChallengeController::class, 'create']);
Route::get('/challenges/{code}', [ChallengeController::class, 'show']);
Route::post('/challenges/{code}/submit', [ChallengeController::class, 'submit']);
