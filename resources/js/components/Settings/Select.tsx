import React, { FC } from 'react';

const Select: FC<{ value: string; onChange: (v: string) => void; options: string[] }> = ({ value, onChange, options }) => (
    <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-indigo-200 focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-white"
    >
        {options.map((o) => (
            <option key={o} value={o}>
                {o}
            </option>
        ))}
    </select>
);

export default Select;
