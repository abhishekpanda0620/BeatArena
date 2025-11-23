<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('solo_scores', function (Blueprint $table) {
            $table->string('language', 2)->default('en')->after('player_name');
            $table->index('language');
        });
    }

    public function down(): void
    {
        Schema::table('solo_scores', function (Blueprint $table) {
            $table->dropIndex(['language']);
            $table->dropColumn('language');
        });
    }
};
