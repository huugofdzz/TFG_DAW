<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Compartir información del usuario autenticado globalmente en Inertia
        Inertia::share('auth', function () {
            $user = Auth::user();
            return [
                'user' => $user ? [
                    'name' => $user->name,
                    'profile_photo_url' => $user->profilePhotoUrl(),
                    'type' => $user->type,
                ] : null,
            ];
        });
    }
}
