import { Link, router, usePage } from '@inertiajs/react';
import React, { SyntheticEvent, useState } from 'react';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const {
        flash: { success },
    } = usePage().props;

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setError(null);
        if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        try {
            // Attempt to send a reset request. The endpoint can be swapped
            // for an Inertia call or a named route as needed by the app.
            router.post(
                '/forgot-password',
                { email },
                {
                    onBefore: () => setSubmitting(true),
                    onFinish: () => setSubmitting(false),
                    onError: (err) => setError(err.email || 'Something wrong'),
                },
            );

            // For privacy we show the same success state whether or not the
            // email exists in the system.
        } catch (err) {
            setError('Something went wrong. Please try again later.');
        }
    };
    console.log(submitting);
    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <svg
                    className="absolute left-1/2 -translate-x-1/2 transform opacity-10"
                    width="1200"
                    height="600"
                    viewBox="0 0 1200 600"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="g1" x1="0" x2="1">
                            <stop offset="0%" stopColor="#7c3aed" />
                            <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                    </defs>
                    <circle cx="300" cy="200" r="260" fill="url(#g1)" />
                    <circle cx="950" cy="420" r="180" fill="#e9e6ff" />
                </svg>
            </div>

            <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white/95 p-8 shadow-lg backdrop-blur-md">
                <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-teal-400 text-white shadow-md">
                        <span className="font-semibold">Z</span>
                    </div>
                    <div>
                        <div className="text-lg font-semibold">Zenkues</div>
                        <div className="text-xs text-gray-400">Form builder</div>
                    </div>
                </div>

                <h1 className="text-2xl font-semibold text-gray-900">Forgot your password?</h1>
                <p className="mt-2 text-sm text-gray-500">Enter your email address and we’ll send you a link to reset your password.</p>

                {success ? (
                    <div className="mt-6 rounded-md border border-green-100 bg-green-50 p-4">
                        <p className="text-sm text-green-800">If an account exists for this email, a password reset link has been sent.</p>
                    </div>
                ) : (
                    <form className="mt-6" onSubmit={handleSubmit}>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={submitting}
                                className="w-full rounded-md border border-gray-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-transparent focus:ring-2 focus:ring-purple-300 focus:outline-none"
                                placeholder="you@example.com"
                                aria-invalid={!!error}
                                aria-describedby={error ? 'email-error' : undefined}
                            />
                        </div>
                        {error && (
                            <p id="email-error" className="mt-2 text-sm text-red-600">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={submitting}
                            className="mt-6 inline-flex w-full cursor-pointer items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-teal-400 px-4 py-2 font-medium text-white shadow transition duration-200 hover:opacity-95 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-60"
                        >
                            {submitting ? 'Sending…' : 'Send Reset Link'}
                        </button>
                    </form>
                )}

                <div className="mt-6 text-center">
                    <Link href="/login" className="text-sm text-purple-600 hover:underline">
                        Back to login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
