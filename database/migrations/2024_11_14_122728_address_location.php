<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement('ALTER TABLE addresses ADD location POINT NOT NULL AFTER id');
        DB::statement('ALTER TABLE addresses ADD SPATIAL INDEX(location)');

        /* Schema::table('events', function (Blueprint $table) { */
        /*     $table->dropColumn(['latitude', 'longitude']); */
        /* }); */
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
