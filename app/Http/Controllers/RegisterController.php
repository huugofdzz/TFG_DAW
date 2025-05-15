<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function showRegistrationForm()
    {
        return Inertia::render('Auth/Register');
    }

    public function register(Request $request)
    {
        $request->validate([
            'type' => 'required|in:player,coach',
            'name' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|max:20',
            'password' => 'required|string|min:8|confirmed',
            'profilePhoto' => 'nullable|image|max:2048',
            
            // Validación condicional para jugadores
            'position' => 'required_if:type,player|string|max:255',
            'secondaryPosition' => 'nullable|string|max:255',
            'currentTeam' => 'nullable|string|max:255',
            'bio' => 'nullable|string|max:500',
            
            // Validación condicional para entrenadores
            'teamManaged' => 'nullable|required_if:type,coach|string|max:255',
            'coachingLicense' => 'nullable|required_if:type,coach|string|max:255',
        ]);

        $userData = [
            'type' => $request->type,
            'name' => $request->name,
            'last_name' => $request->lastName,
            'username' => $request->username,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            
            'position' => $request->position,
            'secondary_position' => $request->secondaryPosition,
            'current_team' => $request->currentTeam,
            'bio' => $request->bio,
            
            'team_managed' => $request->teamManaged,
            'coaching_license' => $request->coachingLicense,
        ];

        // Manejo de la foto de perfil
        if ($request->hasFile('profilePhoto')) {
            $path = $request->file('profilePhoto')->store('profile-photos', 'public');
            $userData['profile_photo_path'] = $path;
        }

        $user = User::create($userData);

        event(new Registered($user));
        Auth::login($user);

        return redirect()->route('/dashboard');
    }
}