import { SettingsUser } from '@/types';
import { usePage } from '@inertiajs/react';

export function useSettings(): SettingsUser | null {
    const { props } = usePage();
    const user = props.auth?.user; // Pastikan menggunakan opsional chaining agar tidak crash

    if (user && user.settings) {
        return JSON.parse(user.settings);
    }
    return null;
}

export function parseSettings(settings: string | null): SettingsUser | null {
    if (settings) return JSON.parse(settings);
    return null;
}

export async function setThemeServer(theme: string) {
    try {
        const res = await fetch('/api/setTheme', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                theme,
            }),
        });
        return {
            status: res.status,
            msg: res.statusText,
        };
    } catch (e) {
        console.error(e);
        alert('Something went error, try again later.');
    }
}
