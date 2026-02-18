<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group(['middleware' => ['guest']], function () {
    // GET Routes
    Route::get('/login', [HomeController::class, 'login'])->name('login');
    Route::get('/register', [HomeController::class, 'register'])->name('register');
    Route::get('/forgot-password', [HomeController::class, 'forgotPassword'])->name('password.request');
    Route::get('/auth/google', [AuthController::class, 'redirectToGoogle'])->name('auth.google');
    Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback'])->name('auth.google.callback');
    // POST Routes

    Route::post('/register', [AuthController::class, 'register'])->name('auth.register');
    Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
});
Route::get('/', [HomeController::class, 'landing'])->name('home');
Route::get('/reset-password', [HomeController::class, 'resetPassword'])->name('password.reset');
Route::post('/forgot-password', [AuthController::class, 'sendResetLinkEmail'])->name('password.email')->middleware('throttle:6,1');
Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.update');
Route::group(['middleware' => ['auth']], function () {
    // GET Routes
    Route::prefix('dashboard')->group(function () {
        Route::get('/', [DashboardController::class, 'dashboard'])->name('dashboard');
        Route::get('/settings', [DashboardController::class, 'settings'])->name('dashboard.settings');
    });
    Route::prefix('profile')->group(function () {
        // GET Routes
        Route::get('/change-password', [ProfileController::class, 'change_password'])->name('profile.change-password');
        Route::get('/', [ProfileController::class, 'profile'])->name('profile');
        // PUT Routes
        Route::put('/update', [ProfileController::class, 'updateProfile'])->name('profile.update');
        Route::put('/change-password', [ProfileController::class, 'change_password_process'])->name('profile.change_password_process');
        Route::put('/settings/save', [ProfileController::class, 'save_settings'])->name('settings.save');
        // DELETE Routes
        Route::delete('/delete', [ProfileController::class, 'delete_account'])->name('profile.delete');
    });
    // API Routes
    Route::get('/api/v1/get_forms', [DashboardController::class, 'getForms'])->name('dashboard.get_forms');
    // DELETE Routes
    Route::delete('/logout', [AuthController::class, 'logout'])->name('auth.logout');
});
