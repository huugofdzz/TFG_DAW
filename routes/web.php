<?php
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia::render('Home');
});
Route::get('/register', function () {
    return inertia::render('Register');
});
