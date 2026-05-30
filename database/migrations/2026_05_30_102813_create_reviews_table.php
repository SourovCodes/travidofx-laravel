<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->string('name', 80);
            $table->string('email', 120);
            $table->string('title', 80)->default('');
            $table->unsignedTinyInteger('rating');
            $table->text('body');
            $table->string('status', 20)->default('pending');
            $table->boolean('featured')->default(false);
            $table->text('admin_note')->nullable();
            $table->timestamps();

            $table->index(['status', 'featured']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
