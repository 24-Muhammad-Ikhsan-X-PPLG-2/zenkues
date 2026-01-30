import React from 'react';

const Header = () => {
    return (
        <>
            <header className="mb-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-200 to-indigo-200 shadow-sm">
                    <span className="font-semibold text-indigo-700">Z</span>
                </div>
                <h1 className="mt-4 text-2xl font-semibold text-gray-900">Welcome back</h1>
                <p className="mt-1 text-sm text-gray-500">Sign in to access your forms and responses.</p>
            </header>
        </>
    );
};

export default Header;
