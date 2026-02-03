import React, { FC } from 'react';

const Field: FC<{ label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }> = ({
    label,
    value,
    onChange,
    placeholder,
    type = 'text',
}) => (
    <div>
        <label className="mb-1 block text-left text-xs font-medium text-gray-700">{label}</label>
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            type={type}
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
        />
    </div>
);

export default Field;
