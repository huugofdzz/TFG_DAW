<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;


class ProfileController extends Controller
{
    // Mostrar el perfil del usuario autenticado (su propio perfil)
    public function show()
    {
        $user = Auth::user();

        return Inertia::render('UserProfile', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'last_name' => $user->last_name,
                'profile_photo_url' => $user->profilePhotoUrl(),
                'type' => $user->type,
                'team_managed' => $user->team_managed,
                'coaching_license' => $user->coaching_license,
                'position' => $user->position,
                'current_team' => $user->current_team,
                'bio' => $user->bio,
                'email' => $user->email,
                'phone' => $user->phone,
            ]
        ]);
    }

    // Mostrar el perfil de OTRO usuario
    public function showOther($id)
    {
        $user = User::findOrFail($id);

        return Inertia::render('UserProfile', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'last_name' => $user->last_name,
                'profile_photo_url' => $user->profilePhotoUrl(),
                'type' => $user->type,
                'team_managed' => $user->team_managed,
                'coaching_license' => $user->coaching_license,
                'position' => $user->position,
                'current_team' => $user->current_team,
                'bio' => $user->bio,
                'email' => $user->email,
                'phone' => $user->phone,
            ]
        ]);
    }
}


