import { Plus } from 'lucide-react';
import React from 'react';

export default function QuickActions({ onCreate, onTemplate }: { onCreate?: () => void; onTemplate?: () => void }) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
                <button
                    onClick={onCreate}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-indigo-500 hover:shadow-xl md:text-base"
                >
                    <Plus className="size-5" /> Create New Form
                </button>
                <button
                    onClick={onTemplate}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition duration-200 hover:bg-gray-50 hover:shadow-xl md:text-base"
                >
                    Use Template
                </button>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-500">
                <div className="hidden items-center gap-1 sm:flex">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span>Auto save enabled</span>
                </div>
            </div>
        </div>
    );
}
