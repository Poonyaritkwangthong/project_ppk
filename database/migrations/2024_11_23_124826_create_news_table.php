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
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('news_title');
            $table->text('news_link');
            $table->longText('news_detail');
            $table->enum('news_status',['start','stop'])->default('stop');
            $table->date('start_announcing');
            $table->date('end_announcing');
            $table->unsignedBigInteger('news_type_id');
            $table->unsignedBigInteger('agency_id');
            $table->timestamps();

            $table->foreign('news_type_id')->references('id')->on('news_type');
            $table->foreign('agency_id')->references('id')->on('agency');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
