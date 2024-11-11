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
        Schema::table('events', function (Blueprint $table) {
            // Drop the old columns
            $table->dropColumn('start_datetime');

            // Add new columns
            $table->date('date')->after('description');
            $table->time('time')->nullable()->after('date');
            $table->boolean('is_all_day')->default(false)->after('time');
            $table->string('venue_name')->after('description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
