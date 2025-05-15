<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Muestra el dashboard del usuario
     */
    public function index()
    {
        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => auth()->user()
            ]
        ]);
    }
}