import { User } from '@/types';
import { router } from '@inertiajs/react';
import React, { FC, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import ModalLogout from './ModalLogout';

type TopNavProps = {
    profile: User;
};

const TopNav: FC<TopNavProps> = ({ profile }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [openModalLogout, setOpenModalLogout] = useState(false);
    const [isImgError, setIsImgError] = useState(false);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleLogout = () => {
        router.delete('/logout');
    };
    return (
        <>
            <ModalLogout openModalLogout={openModalLogout} setOpenModalLogout={setOpenModalLogout} handleLogout={handleLogout} />
            <header className="w-full border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="text-2xl font-semibold text-indigo-600">Zenkues</div>
                            <div className="hidden sm:block">
                                <label className="relative block">
                                    <span className="sr-only">Search</span>
                                    <input
                                        className="block w-full rounded-md border border-gray-200 bg-gray-50 py-2 pr-3 pl-3 text-sm placeholder:text-gray-400 placeholder:italic focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                                        placeholder="Search forms, templates..."
                                        type="text"
                                        name="search"
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="cursor-pointer rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() => setOpen((v) => !v)}
                                    className="flex cursor-pointer items-center space-x-2 rounded-md p-1 hover:bg-gray-100"
                                >
                                    {profile.avatar && !isImgError ? (
                                        <img
                                            src={profile.avatar}
                                            referrerPolicy="no-referrer"
                                            alt="avatar"
                                            className="h-8 w-8 rounded-full bg-gray-200 object-cover"
                                            onError={() => setIsImgError(true)}
                                        />
                                    ) : (
                                        <div className="flex size-8 items-center justify-center rounded-full bg-gray-200">
                                            <span className="text-sm font-medium text-gray-600">{profile.name.charAt(0).toUpperCase()}</span>
                                        </div>
                                    )}
                                    <span className="hidden text-sm text-gray-700 sm:block">{profile.name}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>

                                {open && (
                                    <div
                                        className="absolute right-0 z-10 mt-2 w-48 rounded-md border border-gray-100 bg-white py-1 shadow-lg"
                                        ref={dropdownRef}
                                    >
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            Profile
                                        </a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            Settings
                                        </a>
                                        <p
                                            className="block cursor-pointer px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                                            onClick={() => setOpenModalLogout(true)}
                                        >
                                            Sign out
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default TopNav;
