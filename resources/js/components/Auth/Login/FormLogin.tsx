import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import SocialButton from './SocialButton';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Link, router, usePage } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';

const schema = z.object({
    email: z.email(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    remember: z.boolean(),
});

type SchemaType = z.infer<typeof schema>;

const FormLogin = () => {
    const [showPassword, setPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {
        errors: errorsFromLaravel,
        flash: { success, error },
    } = usePage().props;
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<SchemaType>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
    });
    const handleLogin: SubmitHandler<SchemaType> = (data) => {
        setIsLoading(true);
        router.post('/login', data, {
            onFinish: () => setIsLoading(false),
        });
    };
    const handleLoginWithGoogle = () => {
        window.location.href = '/auth/google';
    };
    return (
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            {success && (
                <div className="rounded-md bg-green-50 p-4">
                    <p className="text-center text-sm text-green-700">{success}</p>
                </div>
            )}
            {error && (
                <div className="rounded-md bg-red-50 p-4">
                    <p className="text-center text-sm text-red-700">{error}</p>
                </div>
            )}
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    readOnly={isLoading}
                    aria-invalid={!!errors.email || !!errorsFromLaravel.email}
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm placeholder-gray-400 transition focus:border-transparent focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                    placeholder="you@company.com"
                    {...register('email')}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                {errorsFromLaravel?.email && <p className="mt-1 text-xs text-red-500">{errorsFromLaravel.email}</p>}
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        readOnly={isLoading}
                        aria-invalid={!!errors.password || !!errorsFromLaravel.password}
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 pr-10 text-sm placeholder-gray-400 transition focus:border-transparent focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                        placeholder="Enter your password"
                        {...register('password')}
                    />
                    <button
                        type="button"
                        onClick={() => setPassword((s) => !s)}
                        className="absolute top-1/2 right-4 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
                {errorsFromLaravel?.password && <p className="mt-1 text-xs text-red-500">{errorsFromLaravel.password}</p>}
            </div>

            <div className="flex items-center justify-between text-sm">
                <label className="inline-flex items-center gap-2 text-gray-600">
                    <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        {...register('remember')}
                    />
                    Remember me
                </label>

                <Link href="/forgot-password" className="text-indigo-600 hover:underline">
                    Forgot password?
                </Link>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition duration-200 hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-gray-500 disabled:opacity-50"
                >
                    {isLoading && <LoadingSpinner />}
                    Login
                </button>
            </div>

            <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <div className="text-xs text-gray-400">Or continue with</div>
                <div className="h-px flex-1 bg-gray-200" />
            </div>

            <SocialButton disabled={isLoading} onClick={handleLoginWithGoogle}>
                Continue with Google
            </SocialButton>

            <p className="text-center text-sm text-gray-600">
                Don’t have an account?{' '}
                <Link href="/register" className="text-indigo-600 hover:underline">
                    Sign up
                </Link>
            </p>
        </form>
    );
};

export default FormLogin;
