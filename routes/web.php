<?php
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserTypeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserSearchController;




Route::get('/', function () {
    if (Auth::check()) {
        // Si el usuario ya está autenticado, mostrar Dashboard
        return Inertia::render('Dashboard');
    }
    // Si no, mostrar Home público
    return Inertia::render('Home');
})->name('home');

// Rutas de autenticación
Route::middleware('guest')->group(function () {
    // Registro
    Route::get('/register', [RegisterController::class, 'showRegistrationForm'])->name('register');
    Route::post('/register', [RegisterController::class, 'register']);

    // Login
    Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [LoginController::class, 'login']);
});

// Rutas protegidas (requieren autenticación)
Route::middleware('auth')->group(function () {
    // Dashboard (ejemplo)
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    //Manda informacion cuando es entrenador
    Route::get('/coaches', [UserTypeController::class, 'coaches'])->name('coaches');
    //Manda informacion cuando es jugador
    Route::get('/players', [UserTypeController::class, 'players'])->name('players');
    // Tu propio perfil (usuario logeado)
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile');
    // Ver el perfil de otro usuario por id
    Route::get('/users/{id}', [ProfileController::class, 'showOther'])->name('users.profile');
    // Buscar usuarios
    Route::get('/search', [UserSearchController::class, 'index'])->name('user.search');
    // Cerrar sesión
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
    // web.php
   

});