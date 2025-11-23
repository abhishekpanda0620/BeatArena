<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Models\ChallengeResult;

/**
 * @property string $challenge_code
 * @property string $creator_session_id
 * @property string $creator_name
 * @property string $language
 * @property array $song_ids
 * @property string $status
 */
class Challenge extends Model
{
    protected $fillable = [
        'challenge_code',
        'creator_session_id',
        'creator_name',
        'language',
        'song_ids',
        'status',
    ];

    protected $casts = [
        'song_ids' => 'array',
    ];

    /**
     * Generate a unique 6‑character alphanumeric code.
     */
    public static function generateUniqueCode(): string
    {
        do {
            $code = Str::upper(Str::random(6));
        } while (self::where('challenge_code', $code)->exists());
        return $code;
    }

    /**
     * Relationship to challenge results.
     */
    public function results()
    {
        return $this->hasMany(ChallengeResult::class);
    }

    /**
     * Determine the winner (highest score, then fastest time).
     */
    public function getWinner()
    {
        return $this->results()
            ->orderByDesc('score')
            ->orderBy('time_taken')
            ->first();
    }
}
