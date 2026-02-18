import { usePage } from '@inertiajs/react';
import { FC } from 'react';

const Field: FC<{ label: string; nameField: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }> = ({
    label,
    value,
    onChange,
    placeholder,
    nameField,
    type = 'text',
}) => {
    const { errors } = usePage().props;
    return (
        <div>
            <label htmlFor={label} className="mb-1 block text-left text-xs font-medium text-gray-700 dark:text-white">
                {label}
            </label>
            <input
                value={value}
                id={label}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                type={type}
                className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-white"
            />
            {errors[nameField] && <p className="mt-1 text-left text-sm font-medium text-red-600">{errors[nameField]}</p>}
        </div>
    );
};

export default Field;
