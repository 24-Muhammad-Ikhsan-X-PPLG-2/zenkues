import { Link, router, usePage } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import React, { FormEvent, useMemo, useState } from 'react';

const PasswordStrength: React.FC<{ score: number }> = ({ score }) => {
    const width = `${Math.min(100, Math.max(0, score))}%`;
    const color = score < 40 ? 'bg-rose-400' : score < 75 ? 'bg-amber-400' : 'bg-emerald-400';
    return (
        <div className="mt-2">
            <div className="h-1 w-full rounded-full bg-gray-100">
                <div className={`h-1 rounded-full transition-all duration-300 ${color}`} style={{ width }} />
            </div>
            <div className="mt-1 text-xs text-gray-500">{score < 40 ? 'Weak' : score < 75 ? 'Medium' : 'Strong'}</div>
        </div>
    );
};

const PasswordField: React.FC<{
    id: string;
    label: string;
    value: string;
    onChange: (v: string) => void;
}> = ({ id, label, value, onChange }) => {
    const [show, setShow] = useState(false);
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="relative mt-1">
                <input
                    id={id}
                    name={id}
                    type={show ? 'text' : 'password'}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-transparent focus:ring-2 focus:ring-purple-300 focus:outline-none"
                    autoComplete="new-password"
                />
                <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    aria-label={show ? 'Hide password' : 'Show password'}
                    className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded px-2 py-1 text-sm text-gray-500 hover:text-gray-700"
                >
                    {show ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
                </button>
            </div>
        </div>
    );
};

const scorePassword = (pw: string) => {
    let score = 0;
    if (pw.length >= 8) score += 30;
    if (/[A-Z]/.test(pw)) score += 25;
    if (/[0-9]/.test(pw)) score += 20;
    if (/[^A-Za-z0-9]/.test(pw)) score += 25;
    return score;
};

type ResetPasswordProps = {
    token: string;
    email: string;
};

const ResetPassword: React.FC<ResetPasswordProps> = ({ token, email }) => {
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [errors, setErrors] = useState<{ password?: string; confirm?: string } | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const {
        flash: { success },
    } = usePage().props;

    const score = useMemo(() => scorePassword(password), [password]);

    const validate = () => {
        const e: { password?: string; confirm?: string } = {};
        if (password.length < 8) {
            e.password = 'Password must be at least 8 characters.';
        } else if (!/[A-Z]/.test(password)) {
            e.password = 'Include at least one uppercase letter.';
        } else if (!/[0-9]/.test(password)) {
            e.password = 'Include at least one number.';
        } else if (!/[^A-Za-z0-9]/.test(password)) {
            e.password = 'Include at least one symbol.';
        }

        if (confirm !== password) {
            e.confirm = 'Passwords do not match.';
        }

        setErrors(Object.keys(e).length ? e : null);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            // Replace with actual Inertia route or API call as needed.
            router.post(
                '/reset-password',
                { password, password_confirmation: confirm, email, token },
                {
                    onBefore: () => setSubmitting(true),
                    onFinish: () => setSubmitting(false),
                    onError: (err) => setErrors({ password: err.password || 'Something wrong.' }),
                },
            );
        } catch (err) {
            setErrors({ password: 'Something went wrong. Please try again.' });
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <svg
                    className="absolute left-1/2 -translate-x-1/2 transform opacity-8"
                    width="1200"
                    height="600"
                    viewBox="0 0 1200 600"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="g2" x1="0" x2="1">
                            <stop offset="0%" stopColor="#eef2ff" />
                            <stop offset="100%" stopColor="#f0f9ff" />
                        </linearGradient>
                    </defs>
                    <rect x="0" y="0" width="1200" height="600" fill="url(#g2)" />
                    <circle cx="220" cy="160" r="220" fill="#f5f3ff" />
                    <circle cx="980" cy="420" r="160" fill="#eef2ff" />
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

                <h1 className="text-2xl font-semibold text-gray-900">Reset your password</h1>
                <p className="mt-2 text-sm text-gray-500">Create a new secure password for your account.</p>

                {success ? (
                    <div className="mt-6 rounded-md border border-green-100 bg-green-50 p-4">
                        <p className="text-sm text-green-800">Your password has been updated successfully.</p>
                        <div className="mt-3 text-right">
                            <Link href="/login" className="text-sm text-purple-600 hover:underline">
                                Back to login
                            </Link>
                        </div>
                    </div>
                ) : (
                    <form className="mt-6" onSubmit={handleSubmit} noValidate>
                        <div className="space-y-4">
                            <div>
                                <PasswordField id="password" label="New password" value={password} onChange={setPassword} />
                                <PasswordStrength score={score} />
                                {errors?.password && <p className="mt-2 text-sm text-rose-600">{errors.password}</p>}
                            </div>

                            <div>
                                <PasswordField id="confirm" label="Confirm new password" value={confirm} onChange={setConfirm} />
                                {errors?.confirm && <p className="mt-2 text-sm text-rose-600">{errors.confirm}</p>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-teal-400 px-4 py-2 font-medium text-white shadow transition duration-200 hover:opacity-95 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-60"
                        >
                            {submitting ? 'Updating…' : 'Update Password'}
                        </button>
                    </form>
                )}

                {!success && (
                    <div className="mt-6 text-center">
                        <Link href="/login" className="text-sm text-gray-500 hover:underline">
                            Back to login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
