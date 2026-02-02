<?php

namespace App\Http\Controllers;

use App\Models\FormsModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard()
    {
        $data = [
            'profile' => Auth::user(),
        ];
        return Inertia::render('dashboard', $data);
    }
    public function getForms()
    {
        $user = Auth::user();
        $forms = $user->forms()->get();

        return response()->json([
            'forms' => $forms,
        ]);
    }
}
