<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('stripe_session_id')->unique();
            $table->string('stripe_payment_intent_id')->nullable();
            $table->string('email');
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('country')->nullable();
            $table->string('plan_slug', 50);
            $table->string('plan_name');
            $table->unsignedInteger('amount_cents');
            $table->string('currency', 10)->default('usd');
            $table->string('status', 30)->default('pending');
            $table->string('payment_method', 30)->nullable();
            $table->text('additional_info')->nullable();
            $table->timestamps();

            $table->index(['status', 'created_at']);
            $table->index('email');
            $table->index('plan_slug');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
