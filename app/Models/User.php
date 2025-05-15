<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'type',
        'name',
        'last_name',
        'username',
        'email',
        'phone',
        'password',
        'profile_photo_path',
        'position',
        'secondary_position',
        'current_team',
        'bio',
        'team_managed',
        'coaching_license'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Mutador para el campo type
    public function setTypeAttribute($value)
    {
        $this->attributes['type'] = strtolower($value);
    }

    // Accesor para el nombre completo
    public function getFullNameAttribute()
    {
        return "{$this->name} {$this->last_name}";
    }

    // Relación con equipos (ejemplo)
    public function team()
    {
        return $this->belongsTo(Team::class, 'current_team', 'name');
    }

    // Scope para jugadores
    public function scopePlayers($query)
    {
        return $query->where('type', 'player');
    }

    // Scope para entrenadores
    public function scopeCoaches($query)
    {
        return $query->where('type', 'coach');
    }

    // Método para la foto de perfil
    public function profilePhotoUrl()
    {
        return $this->profile_photo_path
            ? asset('storage/'.$this->profile_photo_path)
            : asset('images/default-profile.png');
    }
}
