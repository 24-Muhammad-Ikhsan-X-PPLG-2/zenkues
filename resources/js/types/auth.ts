export type User = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    bio?: string;
    organization?: string;
    created_at: string;
    updated_at: string;
    settings: string;
    [key: string]: unknown; // This allows for additional properties...
};

export type Auth = {
    user: User;
};

export type SettingsUser = {
    auto_save: boolean;
    appearance: {
        theme: 'Light' | 'Dark' | 'System' | string;
        accent: string;
        density: string;
    };
    notifications: boolean;
};
