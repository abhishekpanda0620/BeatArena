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
        Schema::create('songs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('artist');
            $table->string('file_path'); // URL or relative path
            $table->enum('language', ['en', 'hi'])->default('en');
            $table->enum('difficulty', ['easy', 'medium', 'hard'])->default('medium');
            $table->json('options'); // Store MCQ options as JSON
            $table->string('correct_option');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('songs');
    }
};
