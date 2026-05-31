<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('coupons', function (Blueprint $table) {
            $table->string('description', 160)->nullable()->default(null)->change();
        });

        Schema::table('reviews', function (Blueprint $table) {
            $table->string('title', 80)->nullable()->default(null)->change();
        });
    }

    public function down(): void
    {
        Schema::table('coupons', function (Blueprint $table) {
            $table->string('description', 160)->default('')->nullable(false)->change();
        });

        Schema::table('reviews', function (Blueprint $table) {
            $table->string('title', 80)->default('')->nullable(false)->change();
        });
    }
};
