import { Link } from '@inertiajs/react';
import React, { FC } from 'react';

const nav = [
    { name: 'Dashboard', key: 'dashboard', url: '/dashboard' },
    { name: 'My Forms', key: 'forms', url: '/dashboard/forms' },
    { name: 'Templates', key: 'templates', url: '/dashboard/templates' },
    { name: 'Responses', key: 'responses', url: '/dashboard/responses' },
    { name: 'Settings', key: 'settings', url: '/dashboard/settings' },
];

type SidebarProps = {
    active?: string;
};

const Sidebar: FC<SidebarProps> = ({ active = 'dashboard' }) => {
    return (
        <aside className="hidden border-r border-gray-50 bg-white md:flex md:w-64 md:flex-col md:gap-4 md:px-4 md:py-6">
            <nav className="space-y-1">
                {nav.map((item) => (
                    <Link
                        key={item.key}
                        href={item.url}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                            active === item.key ? 'bg-indigo-50 font-medium text-indigo-700' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                    >
                        {active === item.key ? (
                            <span className="h-5 w-5 text-indigo-400">
                                {/* simple dot icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                                </svg>
                            </span>
                        ) : (
                            <span className="h-5 w-5 text-gray-400">
                                {/* simple dot icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                                </svg>
                            </span>
                        )}
                        <span>{item.name}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
};
export default Sidebar;
