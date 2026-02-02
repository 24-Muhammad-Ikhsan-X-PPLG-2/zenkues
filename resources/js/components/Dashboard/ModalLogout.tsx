import { AnimatePresence, motion } from 'motion/react';
import { FC, useEffect, useRef } from 'react';

type ModalLogoutProps = {
    openModalLogout: boolean;
    setOpenModalLogout: (open: boolean) => void;
    handleLogout: () => void;
};

const ModalLogout: FC<ModalLogoutProps> = ({ openModalLogout, setOpenModalLogout, handleLogout }) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpenModalLogout(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <AnimatePresence mode="wait">
            {openModalLogout && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed z-99 flex h-full w-full items-center justify-center bg-black/30 backdrop-blur-md"
                >
                    <div className="h-fit w-[400px] rounded-md bg-white shadow" ref={ref}>
                        <h1 className="p-4 text-lg font-semibold">Logout Confirmation</h1>
                        <p className="px-4 text-sm text-gray-600">Are you sure you want to logout?</p>
                        <div className="mt-6 mb-4 flex justify-end space-x-4 px-4">
                            <button
                                onClick={() => setOpenModalLogout(false)}
                                className="cursor-pointer rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="cursor-pointer rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModalLogout;
