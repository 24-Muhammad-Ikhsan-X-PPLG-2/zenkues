<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function landing()
    {
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
}
