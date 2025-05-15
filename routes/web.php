<?php
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;





// Página de inicio (Home)
Route::get('/', function () {
    return Inertia::render('Home'); // Carga tu componente React/Vue/Svelte
})->name('home');

// Rutas de autenticación
Route::middleware('guest')->group(function () {
    // Registro
    Route::get('/register', [RegisterController::class, 'showRegistrationForm'])->name('register');
    Route::post('/register', [RegisterController::class, 'register']);

    // Login
    Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [LoginController::class, 'login']);
    //Manda informacion cuando es entrenador
    Route::get('/coaches', [UserTypeController::class, 'coach'])->middleware('auth');
    //Manda informacion cuando es jugador
     Route::get('/coaches', [UserTypeController::class, 'player'])->middleware('auth');
});

// Rutas protegidas (requieren autenticación)
Route::middleware('auth')->group(function () {
    // Dashboard (ejemplo)
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::get('/coaches', function () {
        return Inertia::render('Coaches');
    })->name('coaches');
    Route::get('/players', function () {
        return Inertia::render('PLayers');
    })->name('Players');

    // Cerrar sesión
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
});