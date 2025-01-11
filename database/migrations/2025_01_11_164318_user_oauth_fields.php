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
        Schema::table('users', function (Blueprint $table) {
            $table->string('avatar_url')->nullable()->after('email');
            $table->string('oauth_id')->nullable()->after('avatar_url');
            $table->string('oauth_provider')->nullable()->after('oauth_id');
            $table->string('oauth_refresh_token')->nullable()->after('oauth_provider');
            $table->string('oauth_token')->nullable()->after('oauth_refresh_token');
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
