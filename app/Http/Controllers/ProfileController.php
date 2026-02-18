<?php

namespace App\Http\Controllers;

use App\Models\User;
use Hash;
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
            if ($user->avatar) {
                $pathFileToRemove = Str::after($user->avatar, '/storage/');
                if (Storage::disk('public')->exists($pathFileToRemove)) {
                    Storage::disk('public')->delete($pathFileToRemove);
                }
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
    public function change_password()
    {
        $user = Auth::user();
        if ($user->provider == "google") {
            return redirect('/profile')->with('error', "Can't change the password because you're account from google.");
        }
        return Inertia::render('profile/change-password');
    }
    public function change_password_process(Request $req)
    {
        $validated = $req->validate([
            'newPassword' => 'required|string|confirmed',
            'currentPassword' => 'required|string|current_password',
        ]);
        $user = Auth::user();
        User::query()->where('id', $user->id)->update([
            'password' => Hash::make($validated['newPassword']),
        ]);
        return redirect('/profile')->with('success', 'Success to change the password.');
    }
    public function delete_account(Request $req)
    {
        $req->validate([
            'password' => 'required|current_password'
        ]);
        $user = $req->user();
        if ($user->avatar) {
            $pathFileToRemove = Str::after($user->avatar, '/storage/');
            if (Storage::disk('public')->exists($pathFileToRemove)) {
                Storage::disk('public')->delete($pathFileToRemove);
            }
        }
        Auth::logout();
        $user->delete();
        $req->session()->invalidate();
        $req->session()->regenerateToken();
        return redirect('/login');
    }
    public function save_settings(Request $req)
    {
        $validated = $req->validate([
            'theme' => 'required',
            'accent' => 'required',
            'density' => 'required',
            'auto_save' => 'required|boolean',
        ]);
        $data = [
            'auto_save' => $validated['auto_save'],
            'appearance' => [
                'theme' => $validated['theme'],
                'accent' => $validated['accent'],
                'density' => $validated['density'],
            ],
            'notifications' => true,
        ];
        $user = Auth::user();
        $user->settings = json_encode($data);
        $user->save();
        return back();
    }
}
