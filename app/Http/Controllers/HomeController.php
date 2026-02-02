<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function landing()
    {
        $user = Auth::user();
        if ($user) {
            return redirect()->route('dashboard');
        }
        return Inertia::render('landing');
    }
    public function login()
    {
        return Inertia::render('auth/login');
    }
    public function register()
    {
        return Inertia::render('auth/register');
    }

    public function forgotPassword()
    {
        return Inertia::render('auth/forgot-password');
    }
    public function resetPassword(Request $request)
    {
        return Inertia::render('auth/reset-password', [
            'token' => $request->query('token'),
            'email' => $request->query('email'),
        ]);
    }
}
