import React, { FC } from 'react';

const Toggle: FC<{ checked: boolean; onChange: (v: boolean) => void; label?: string }> = ({ checked, onChange, label }) => {
    return (
        <button
            aria-pressed={checked}
            onClick={() => onChange(!checked)}
            className={`inline-flex h-8 w-14 cursor-pointer items-center rounded-full p-1 transition-colors ${checked ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
            <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition-transform dark:bg-gray-800 ${
                    checked ? 'translate-x-6' : 'translate-x-0'
                }`}
            />
            {label && <span className="ml-3 text-sm text-gray-600">{label}</span>}
        </button>
    );
};

export default Toggle;
