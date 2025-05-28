<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class UserTypeController extends Controller
{
    public function coaches()
    {
        $coaches = User::where('type', 'coach')
            ->inRandomOrder()
            ->paginate(9)
            ->through(fn($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'last_name' => $user->last_name,
                'team_managed' => $user->team_managed,
                'coaching_license' => $user->coaching_license,
                'profile_photo_url' => $user->profilePhotoUrl(),
            ]);

        return Inertia::render('Coaches', ['coaches' => $coaches]);
    }



    public function players()
    {
        $players = User::where('type', 'player')
            ->inRandomOrder()
            ->paginate(9)
            ->through(fn($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'last_name' => $user->last_name,
                'position' => $user->position,
                'current_team' => $user->current_team,
                'bio' => $user->bio,
                'profile_photo_url' => $user->profilePhotoUrl(),
            ]);

        return Inertia::render('Players', ['players' => $players]);
    }
}
