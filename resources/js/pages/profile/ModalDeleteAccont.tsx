import { router, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'motion/react';
import { FC, useEffect, useRef, useState } from 'react';

type Props = {
    setShow: (v: boolean) => void;
    show: boolean;
};

const ModalDeleteAccont: FC<Props> = ({ setShow, show }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const ref = useRef<HTMLDivElement>(null);
    const { errors } = usePage().props;
    const handleCloseModal = () => setShow(false);
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setShow(false);
            }
        };
        window.addEventListener('mousedown', handleClick);
        return () => window.removeEventListener('mousedown', handleClick);
    }, []);
    const handleDelete = () => {
        try {
            const inputUser = prompt('Please type your password to confirm.');
            if (!inputUser) {
                alert("Enter you're password!");
                return;
            }
            router.delete('/profile/delete', {
                data: {
                    password: inputUser,
                },
                onBefore: () => setIsLoading(true),
                onFinish: () => setIsLoading(false),
                preserveScroll: true,
                preserveState: true,
            });
        } catch (e) {
            console.error(e);
            setError('Something went wrong, please try again later.');
        }
    };
    useEffect(() => {
        if (errors.password) {
            setError(errors.password);
        } else {
            setError('');
        }
    }, [errors.password]);
    return (
        <AnimatePresence mode="wait">
            {error.trim() !== '' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setError('')}
                    className="fixed top-0 left-0 z-999 flex h-full w-full items-center justify-center bg-black/40 px-4 backdrop-blur-md"
                >
                    <div className="flex h-20 w-full items-center justify-center rounded-md bg-red-100 text-center lg:w-1/2">
                        <p className="text-red-600">{error}!</p>
                    </div>
                </motion.div>
            )}
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
                        ref={ref}
                        className="h-fit w-[400px] rounded-md bg-white shadow dark:bg-gray-900"
                    >
                        <h1 className="p-4 text-lg font-semibold">Delete Account</h1>
                        <p className="px-4 text-sm text-red-500">
                            Once you delete your account, all of your data and resources will be permanently removed.
                        </p>
                        <div className="mt-6 mb-4 flex justify-end space-x-4 px-4">
                            <button
                                onClick={handleCloseModal}
                                disabled={isLoading}
                                className="cursor-pointer rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isLoading}
                                className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:bg-red-400"
                            >
                                {isLoading ? 'Deleting...' : 'Yes, Delete!'}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModalDeleteAccont;
