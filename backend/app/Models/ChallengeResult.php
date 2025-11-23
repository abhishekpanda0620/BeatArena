<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $challenge_id
 * @property string $player_session_id
 * @property string $player_name
 * @property int $score
 * @property int $time_taken
 * @property array|null $answers
 * @property \Carbon\Carbon $completed_at
 */
class ChallengeResult extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'challenge_id',
        'player_session_id',
        'player_name',
        'score',
        'time_taken',
        'answers',
        'completed_at',
    ];

    protected $casts = [
        'answers' => 'array',
        'completed_at' => 'datetime',
    ];

    public function challenge()
    {
        return $this->belongsTo(Challenge::class);
    }
}
