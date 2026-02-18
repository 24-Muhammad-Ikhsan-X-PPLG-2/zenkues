import { zodResolver } from '@hookform/resolvers/zod';
import { router, usePage } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { FC, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

const passwordSchema = z
    .object({
        currentPassword: z.string().min(1, 'Current password is required'),
        newPassword: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(/[A-Z]/, 'Must include at least one uppercase letter')
            .regex(/[0-9]/, 'Must include at least one number')
            .regex(/[^A-Za-z0-9]/, 'Must include at least one symbol'),
        confirmPassword: z.string().min(1, 'Please confirm your password'),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    });

type FormValues = z.infer<typeof passwordSchema>;

type Props = {
    showModal: boolean;
    setShowModal: (v: boolean) => void;
};

const FormChangePassword: FC<Props> = ({ setShowModal, showModal }) => {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const {
        errors: errorsFromInertia,
        auth: { user },
    } = usePage().props;
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            confirmPassword: '',
            currentPassword: '',
            newPassword: '',
        },
    });
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        router.put('/profile/change-password', {
            newPassword: data.newPassword,
            currentPassword: data.currentPassword,
            newPassword_confirmation: data.confirmPassword,
        });
    };
    const handleForgotPassword = () => {
        if (!user) return;
        setShowModal(true);
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-white">Current password</label>
                        <div className="relative">
                            <input
                                type={showCurrent ? 'text' : 'password'}
                                {...register('currentPassword')}
                                className={`w-full rounded-lg border px-4 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-transparent focus:ring-2 focus:ring-purple-200 focus:outline-none ${errors.currentPassword ? 'border-red-200' : 'border-gray-100 dark:border-gray-800'}`}
                                placeholder="Enter current password"
                                aria-invalid={!!errors.currentPassword}
                                aria-describedby={errors.currentPassword ? 'currentPassword-error' : undefined}
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                onClick={() => setShowCurrent((s) => !s)}
                                className="absolute top-1/2 right-2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                                aria-label={showCurrent ? 'Hide current password' : 'Show current password'}
                            >
                                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {errors.currentPassword && (
                            <p id="currentPassword-error" className="mt-2 text-xs text-red-600">
                                {errors.currentPassword.message}
                            </p>
                        )}
                        {errorsFromInertia.currentPassword && (
                            <p id="currentPassword-error" className="mt-2 text-xs text-red-600">
                                {errorsFromInertia.currentPassword}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-white">New password</label>
                        <div className="relative">
                            <input
                                type={showNew ? 'text' : 'password'}
                                {...register('newPassword')}
                                className={`w-full rounded-lg border px-4 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-transparent focus:ring-2 focus:ring-purple-200 focus:outline-none ${errors.newPassword ? 'border-red-200' : 'border-gray-100 dark:border-gray-800'}`}
                                placeholder="Create a strong password"
                                aria-invalid={!!errors.newPassword}
                                aria-describedby={errors.newPassword ? 'newPassword-error' : undefined}
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                onClick={() => setShowNew((s) => !s)}
                                className="absolute top-1/2 right-2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                                aria-label={showNew ? 'Hide new password' : 'Show new password'}
                            >
                                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {errors.newPassword ? (
                            <p id="newPassword-error" className="mt-2 text-xs text-red-600">
                                {errors.newPassword.message}
                            </p>
                        ) : (
                            <p className="mt-2 text-xs text-slate-400">Minimum 8 characters · 1 uppercase · 1 number · 1 symbol</p>
                        )}
                        {errorsFromInertia.newPassword && (
                            <p id="currentPassword-error" className="mt-2 text-xs text-red-600">
                                {errorsFromInertia.newPassword}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-white">Confirm new password</label>
                        <div className="relative">
                            <input
                                type={showConfirm ? 'text' : 'password'}
                                {...register('confirmPassword')}
                                className={`w-full rounded-lg border px-4 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-transparent focus:ring-2 focus:ring-purple-200 focus:outline-none ${errors.confirmPassword ? 'border-red-200' : 'border-gray-100 dark:border-gray-800'}`}
                                placeholder="Confirm new password"
                                aria-invalid={!!errors.confirmPassword}
                                aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                onClick={() => setShowConfirm((s) => !s)}
                                className="absolute top-1/2 right-2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                                aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                            >
                                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                        {errors.confirmPassword ? (
                            <p id="confirmPassword-error" className="mt-2 text-xs text-red-600">
                                {errors.confirmPassword.message}
                            </p>
                        ) : null}
                        {errorsFromInertia.confirmPassword && (
                            <p id="currentPassword-error" className="mt-2 text-xs text-red-600">
                                {errorsFromInertia.confirmPassword}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow hover:brightness-105 disabled:opacity-60"
                        >
                            Update Password
                        </button>

                        <p
                            onClick={handleForgotPassword}
                            className="cursor-pointer text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-500"
                        >
                            Forgot password?
                        </p>
                    </div>
                </div>
            </form>
        </>
    );
};

export default FormChangePassword;
