import { zodResolver } from '@hookform/resolvers/zod';
import React, { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import SocialButton from '../Login/SocialButton';
import { Link } from '@inertiajs/react';

const schema = z
    .object({
        name: z.string().min(1, { message: 'Full name is required' }),
        email: z.email({ message: 'Invalid email address' }),
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters' })
            .regex(/[A-Z]/, { message: 'Include at least one uppercase letter' })
            .regex(/[0-9]/, { message: 'Include at least one number' })
            .regex(/[^A-Za-z0-9]/, { message: 'Include at least one symbol' }),
        passwordConfirm: z.string(),
        terms: z.boolean().refine((val) => val === true, { message: 'You must accept the terms and conditions' }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Passwords do not match',
    });

type SchemaType = z.infer<typeof schema>;

const FormRegister = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SchemaType>({
        resolver: zodResolver(schema),
        defaultValues: { name: '', email: '', password: '', passwordConfirm: '', terms: false },
    });

    const password = watch('password') || '';

    const strength = useMemo(() => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        // Normalize to 0..3 for display
        if (score <= 1) return { label: 'Weak', value: 1, color: 'bg-red-400' };
        if (score === 2) return { label: 'Medium', value: 2, color: 'bg-yellow-400' };
        return { label: 'Strong', value: 3, color: 'bg-emerald-400' };
    }, [password]);

    const onSubmit: SubmitHandler<SchemaType> = (data) => {
        setIsLoading(true);
        setTimeout(() => {
            console.log('Register data', data);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Full name</label>
                <input
                    type="text"
                    {...register('name')}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm placeholder-gray-400 transition focus:border-transparent focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    {...register('email')}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm placeholder-gray-400 transition focus:border-transparent focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                    placeholder="you@company.com"
                    aria-invalid={!!errors.email}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        {...register('password')}
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 pr-10 text-sm placeholder-gray-400 transition focus:border-transparent focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                        placeholder="Create a password"
                        aria-invalid={!!errors.password}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute top-1/2 right-2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}

                <div className="mt-2">
                    <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
                        <span>Password strength</span>
                        <span className="font-medium text-gray-700">{strength.label}</span>
                    </div>
                    <div className="h-1 w-full rounded-full bg-gray-100">
                        <div className={`h-1 rounded-full ${strength.color} transition-all`} style={{ width: `${(strength.value / 3) * 100}%` }} />
                    </div>
                </div>
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Confirm password</label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('passwordConfirm')}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm placeholder-gray-400 transition focus:border-transparent focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                    placeholder="Repeat your password"
                    aria-invalid={!!errors.passwordConfirm}
                />
                {errors.passwordConfirm && <p className="mt-1 text-xs text-red-500">{errors.passwordConfirm.message}</p>}
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="terms"
                    {...register('terms')}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label className="text-sm text-gray-600" htmlFor="terms">
                    I agree to the{' '}
                    <a href="/terms" className="text-indigo-600 hover:underline">
                        Terms &amp; Conditions
                    </a>
                </label>
            </div>
            {errors.terms && <p className="mt-1 text-xs text-red-500">{errors.terms.message}</p>}

            <div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition duration-200 hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50"
                >
                    {isLoading ? 'Creating account...' : 'Sign up'}
                </button>
            </div>

            <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <div className="text-xs text-gray-400">Or continue with</div>
                <div className="h-px flex-1 bg-gray-200" />
            </div>

            <SocialButton disabled={isLoading} onClick={() => console.log('Continue with Google')}>
                Continue with Google
            </SocialButton>

            <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-indigo-600 hover:underline">
                    Sign in
                </Link>
            </p>
        </form>
    );
};

export default FormRegister;
