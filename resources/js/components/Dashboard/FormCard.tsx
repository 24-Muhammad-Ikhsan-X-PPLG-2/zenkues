import React from 'react';

interface Props {
    id: string | number;
    title: string;
    description?: string;
    lastEdited?: string;
    responses?: number;
}

export default function FormCard({ id, title, description, lastEdited, responses = 0 }: Props) {
    return (
        <div className="rounded-lg border border-gray-50 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-xl">
            <div className="p-4">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                        <p className="mt-1 text-xs text-gray-500">{description}</p>
                    </div>
                    <div className="text-xs text-gray-400">{responses} responses</div>
                </div>

                <div className="mt-1 flex flex-wrap items-center justify-between text-xs text-gray-400">
                    <div>Last edited {lastEdited}</div>
                    <div className="mt-2 flex items-center gap-2">
                        <button className="px-2 py-1 text-indigo-600 hover:underline">Edit</button>
                        <button className="px-2 py-1 text-gray-600 hover:underline">Responses</button>
                        <button className="px-2 py-1 text-gray-600 hover:underline">Share</button>
                        <button className="px-2 py-1 text-red-500 hover:underline">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
