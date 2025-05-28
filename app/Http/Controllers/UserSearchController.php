<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserSearchController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->input('q'); // El parámetro de búsqueda
        $users = User::query()
            ->when($query, function ($q) use ($query) {
                $q->where('username', 'like', "%$query%");
            })
            ->limit(15)
            ->get()
            ->map(fn($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'last_name' => $user->last_name,
                'username' => $user->username,
                'profile_photo_url' => $user->profilePhotoUrl(),
            ]);
        return Inertia::render('UserSearch', [
            'users' => $users,
            'query' => $query,
        ]);
    }
}
