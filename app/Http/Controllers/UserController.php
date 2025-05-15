<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class UserTypeController extends Controller {


    public function coaches()
    {
        $coaches = User::where('type', 'coach')
            ->inRandomOrder()
            ->select('id', 'name', 'lastName', 'teamManaged', 'coachingLicense', 'profilePhoto')
            ->get();

        return Inertia::render('Coaches', ['coaches' => $coaches]);
    }

    public function players()
    {
        $players = User::where('type', 'player')
            ->inRandomOrder()
            ->select('id', 'name', 'lastName', 'position', 'currentTeam', 'bio', 'profilePhoto')
            ->get();

        return Inertia::render('Players', ['players' => $players]);
    }

}
