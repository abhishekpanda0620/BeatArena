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
        Schema::create('challenges', function (Blueprint $table) {
            $table->id();
            $table->string('challenge_code', 6)->unique();
            $table->string('creator_session_id')->index();
            $table->string('creator_name');
            $table->string('language', 2);
            $table->json('song_ids');
            $table->string('status')->default('waiting')->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('challenges');
    }
};
