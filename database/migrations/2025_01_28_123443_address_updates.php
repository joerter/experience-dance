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
        Schema::table('addresses', function (Blueprint $table) {
            $table->dropIndex('location'); // The index name might be different in your case
        });

        // drop location column
        Schema::table('addresses', function (Blueprint $table) {
            $table->dropColumn('location');
            $table->dropColumn('latitude');
            $table->dropColumn('longitude');
            $table->string('timezone')->after('country')->default('America/New_York');
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
