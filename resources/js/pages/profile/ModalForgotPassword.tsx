import { router, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'motion/react';
import { FC, useEffect, useRef, useState } from 'react';

type Props = {
    setShow: (v: boolean) => void;
    show: boolean;
};

const ModalForgotPassword: FC<Props> = ({ setShow, show }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const {
        auth: { user },
    } = usePage().props;
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setShow(false);
            }
        };
        window.addEventListener('mousedown', handleClick);
        return () => window.removeEventListener('mousedown', handleClick);
    }, []);
    const handleForgotPassword = () => {
        if (!user) return;
        try {
            router.post(
                '/forgot-password',
                { email: user.email },
                {
                    onBefore: () => {
                        setIsLoading(true);
                        setSuccess(false);
                        setError('');
                    },
                    onFinish: () => {
                        setIsLoading(false);
                        setSuccess(true);
                    },
                    onError: () => {
                        setSuccess(false);
                        setError('Something went wrong, try again later.');
                    },
                    preserveScroll: true,
                    preserveState: true,
                },
            );
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <AnimatePresence mode="wait">
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed top-0 left-0 z-99 flex h-full w-full items-center justify-center bg-black/40 backdrop-blur-md"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ delay: 0.2 }}
                        className="h-fit w-[400px] rounded-md bg-white shadow dark:bg-gray-900"
                        ref={ref}
                    >
                        <h1 className="p-4 text-lg font-semibold">Forgot Password</h1>
                        {success ? (
                            <p className="px-4 text-sm text-green-600">Password reset link has been sent.</p>
                        ) : error.trim() !== '' ? (
                            <p className="px-4 text-sm text-red-600">{error}</p>
                        ) : (
                            <p className="px-4 text-sm text-gray-600 dark:text-gray-400">
                                Would you like us to send a password reset link to your email?
                            </p>
                        )}
                        <div className="mt-6 mb-4 flex justify-end space-x-4 px-4">
                            {success ? (
                                <>
                                    <button
                                        onClick={() => setShow(false)}
                                        className="cursor-pointer rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:bg-violet-400"
                                    >
                                        Ok
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setShow(false)}
                                        disabled={isLoading}
                                        className="cursor-pointer rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
                                    >
                                        No, thank you!
                                    </button>
                                    <button
                                        disabled={isLoading}
                                        onClick={handleForgotPassword}
                                        className="cursor-pointer rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:bg-violet-400"
                                    >
                                        {isLoading ? 'Sending...' : 'Yes please.'}
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModalForgotPassword;
