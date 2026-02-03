<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Pest\Support\Str;

class ProfileController extends Controller
{
    public function profile()
    {
        $data = [
            'profile' => Auth::user(),
        ];
        return Inertia::render('profile/index', $data);
    }
    public function updateProfile(Request $req)
    {
        $validated = $req->validate([
            'name' => 'required|string|max:255',
            'avatar' => 'nullable|image|max:2048',
            'bio' => 'nullable|string|max:500',
            'organization' => 'nullable|string|max:255',
        ]);
        $user = Auth::user();
        if ($req->hasFile('avatar')) {
            $pathFileToRemove = Str::after($user->avatar, '/storage/');
            if (Storage::disk('public')->exists($pathFileToRemove)) {
                Storage::disk('public')->delete($pathFileToRemove);
            }
            $path = $req->file('avatar')->store('avatars', 'public');
            $user->avatar = env('APP_URL') . "/storage/$path";
        }
        $user->name = $validated['name'];
        $user->bio = $validated['bio'];
        $user->organization = $validated['organization'];
        $user->save();
        return redirect()->route('profile')->with('success', 'Profile updated successfully.');
    }
}
