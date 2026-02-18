<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Laravel\Socialite\Socialite;
use Pest\Support\Str;

class AuthController extends Controller
{
    public function register()
    {
        $validated = request()->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);
        Log::info("New user registered: user_email = {$user->email}, user_id = {$user->id}");
        return redirect('/login')->with('success', 'Registration successful. Please log in.');
    }
    public function login()
    {
        $validated = request()->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember' => 'sometimes|boolean',
        ]);
        if (Auth::attempt([
            'email' => $validated['email'],
            'password' => $validated['password'],
        ], $validated['remember'] ?? false)) {
            request()->session()->regenerate();
            Log::info("user logged in: user_email = {$validated['email']}");
            return redirect()->intended('/dashboard');
        }
        return back()->withErrors([
            'email' => 'Email or password is incorrect.',
            'password' => 'Email or password is incorrect.',
        ])->onlyInput('email');
    }
    public function logout()
    {
        $userEmail = Auth::user()->email;
        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
        Log::info("User logged out: user_email = {$userEmail}");
        return redirect('/login');
    }
    public function sendResetLinkEmail(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|string|email',
        ]);
        Password::sendResetLink($request->only('email'));
        Log::info("Password reset link requested for email: {$validated['email']}");
        return back()->with('success', 'If your email is registered, a password reset link has been sent.');
    }
    public function resetPassword(Request $request)
    {
        $validated = $request->validate([
            'token' => 'required|string',
            'email' => 'required|string|email',
            'password' => 'required|string|min:8|confirmed',
            'password_confirmation' => 'required|string|min:8',
        ]);
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->password = Hash::make($password);
                $user->setRememberToken(Str::random(60));
                $user->save();
                event(new PasswordReset($user));
                Log::info("Password reset successful for user_email = {$user->email}");
            }
        );
        if ($status == Password::PASSWORD_RESET) {
            return redirect('/login')->with('success', 'Your password has been reset successfully. Please log in.');
        } else {
            return back()->withErrors(['email' => __($status)]);
        }
    }
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }
    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            $isUserExists = User::where('email', $googleUser->getEmail())->first();
            if ($isUserExists) {
                if (!$isUserExists->provider || $isUserExists->provider !== 'google') {
                    Log::warning("Google login attempt failed: email already registered with different provider: user_email = {$googleUser->getEmail()}");
                    return redirect('/login')->with('error', 'Email already registered.');
                }
                Auth::login($isUserExists);
                Log::info("User logged in with Google: user_email = {$googleUser->getEmail()}");
                return redirect()->intended('/dashboard');
            } else {
                $newUser = User::create([
                    'name' => $googleUser->getName(),
                    'avatar' => $googleUser->getAvatar(),
                    'provider' => 'google',
                    'email' => $googleUser->getEmail(),
                    'password' => Hash::make(Str::random(16)),
                ]);
                Auth::login($newUser);
                Log::info("New user registered and logged in with Google: user_email = {$googleUser->getEmail()}, user_id = {$newUser->id}");
                return redirect()->intended('/dashboard');
            }
        } catch (\Exception $e) {
            Log::error("Google authentication failed: " . $e->getMessage());
            return redirect('/login')->with('error', 'Failed to authenticate with Google. Please try again.');
        }
    }
}
