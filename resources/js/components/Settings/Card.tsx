import React, { FC, ReactNode } from 'react';

const Card: FC<{ title: string; description?: string; children: ReactNode }> = ({ title, description, children }) => (
    <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
        <div className="mb-4">
            <h3 className="text-gray-90 text-sm font-semibold dark:text-white">{title}</h3>
            {description && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</p>}
        </div>
        <div className="space-y-4">{children}</div>
    </div>
);

export default Card;
