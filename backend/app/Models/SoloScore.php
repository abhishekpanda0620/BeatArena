<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SoloScore extends Model
{
    use HasFactory;

    protected $fillable = ['player_name', 'score', 'time_taken'];
}
