import { CheckCircle } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import FormChangePassword from '@/components/Profile/change-password/FormChangePassword';
import { useRef, useState } from 'react';
import ModalForgotPassword from './ModalForgotPassword';
const ChangePassword: React.FC = () => {
    const {
        flash: { success },
    } = usePage().props;
    const [showModalForgotPassword, setShowForgotPassword] = useState(false);
    return (
        <>
            <ModalForgotPassword setShow={setShowForgotPassword} show={showModalForgotPassword} />
            <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12 dark:bg-gray-900">
                <div className="absolute inset-0 z-1 overflow-hidden">
                    <svg
                        className="h-full w-full opacity-10"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid slice"
                        viewBox="0 0 800 600"
                    >
                        <defs>
                            <linearGradient id="g" x1="0%" x2="100%" y1="0%" y2="100%">
                                <stop offset="0%" stopColor="#eef2ff" />
                                <stop offset="100%" stopColor="#ffffff" />
                            </linearGradient>
                        </defs>
                        <rect width="800" height="600" fill="url(#g)" />
                    </svg>
                </div>

                <div className="relative z-10 w-full max-w-md">
                    <div className="rounded-2xl border border-gray-100 bg-white/95 p-8 shadow-lg backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/95">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-purple-300 to-indigo-300 font-semibold text-white shadow-sm">
                                Z
                            </div>
                            <div className="w-[80%]">
                                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Change your password</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Create a strong password to keep your forms and data secure.
                                </p>
                            </div>
                        </div>

                        {success ? (
                            <div className="mb-4 flex items-start gap-3 rounded-md border border-green-100 bg-green-50 p-3">
                                <CheckCircle className="text-green-600" />
                                <div className="text-sm text-green-800">{success}</div>
                            </div>
                        ) : null}

                        <FormChangePassword setShowModal={setShowForgotPassword} showModal={showModalForgotPassword} />
                    </div>
                    <p className="mt-3 text-center text-xs text-slate-400">Keeping your account secure — Zenkues</p>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;
