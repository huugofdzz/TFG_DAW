<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['player', 'coach'])->default('player');
            $table->string('name');
            $table->string('last_name');
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->string('phone');
            $table->string('password');
            $table->string('profile_photo_path')->nullable();
            
            // Campos específicos de jugador
            $table->string('position')->nullable();
            $table->string('secondary_position')->nullable();
            $table->string('current_team')->nullable();
            $table->text('bio')->nullable();
            
            // Campos específicos de entrenador
            $table->string('team_managed')->nullable();
            $table->string('coaching_license')->nullable();
            
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
};