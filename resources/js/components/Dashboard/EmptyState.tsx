import React from 'react';

export default function EmptyState({ onCreate }: { onCreate?: () => void }) {
    return (
        <div className="px-6 py-16 text-center">
            <div className="mx-auto max-w-xl">
                <div className="mb-6">
                    <svg className="mx-auto h-40 w-40 text-indigo-100" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="3" y="7" width="18" height="11" rx="2" strokeWidth="1.5" />
                        <path d="M7 7V5a3 3 0 013-3h4a3 3 0 013 3v2" strokeWidth="1.5" />
                    </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Create your first form</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Collect responses, customize themes, and share with anyone.</p>
                <div className="mt-6 flex justify-center gap-3">
                    <button onClick={onCreate} className="rounded-md bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-500">
                        Create New Form
                    </button>
                    <button className="cursor-pointer rounded-md border border-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-white dark:hover:bg-gray-800">
                        Use Template
                    </button>
                </div>
            </div>
        </div>
    );
}
