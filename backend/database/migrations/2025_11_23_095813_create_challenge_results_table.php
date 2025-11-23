<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('challenge_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('challenge_id')->constrained()->onDelete('cascade');
            $table->string('player_session_id')->index();
            $table->string('player_name');
            $table->integer('score');
            $table->integer('time_taken'); // in milliseconds
            $table->json('answers')->nullable();
            $table->timestamp('completed_at')->useCurrent();
            
            // Prevent duplicate submissions from same session
            $table->unique(['challenge_id', 'player_session_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('challenge_results');
    }
};
