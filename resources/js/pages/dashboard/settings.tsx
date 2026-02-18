import React, { FC, ReactNode, useState } from 'react';
import TopNav from '../../components/Dashboard/TopNav';
import Sidebar from '../../components/Dashboard/Sidebar';
import { User } from '@/types/auth';
import Toggle from '@/components/Settings/Toggle';
import Select from '@/components/Settings/Select';
import ColorSwatch from '@/components/Settings/ColorSwatch';
import Card from '@/components/Settings/Card';
import Divider from '@/components/Settings/Divider';
import General from '@/components/Settings/Card/General';
import Appearance from '@/components/Settings/Card/Appearance';
import Notifications from '@/components/Settings/Card/Notifications';
import Account from '@/components/Settings/Card/Account';
import { router, usePage } from '@inertiajs/react';
import { parseSettings } from '@/lib/settingsDB';
import { useTheme } from 'next-themes';
import ModalDeleteAccont from '../profile/ModalDeleteAccont';

type SettingsProps = {
    profile: User;
};

const Settings: FC<SettingsProps> = ({ profile }) => {
    const {
        auth: { user },
    } = usePage().props;
    const settings = parseSettings(user?.settings ?? null);
    const { setTheme: setThemeNext } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showModalDeleteAccount, setShowModalDeleteAccount] = useState(false);
    // General
    const [autoSave, setAutoSave] = useState(settings?.auto_save ?? true);
    const [privacy, setPrivacy] = useState('Private');
    const [language, setLanguage] = useState('English');
    // Appearance
    const [theme, setTheme] = useState(settings ? settings.appearance.theme.charAt(0).toUpperCase() + settings.appearance.theme.slice(1) : 'Light');
    const [accent, setAccent] = useState(settings?.appearance.accent ?? '#6366f1');
    const [density, setDensity] = useState(settings?.appearance.density ?? 'Comfortable');

    // Notifications
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [responseAlerts, setResponseAlerts] = useState(true);
    const [systemUpdates, setSystemUpdates] = useState(false);

    // Account (placeholders)

    const handleSave = () => {
        const payload = {
            autoSave,
            privacy,
            language,
            theme,
            accent,
            density,
            emailNotifications,
            responseAlerts,
            systemUpdates,
        };
        // TODO: wire to API
        // eslint-disable-next-line no-console
        try {
            router.put(
                '/profile/settings/save',
                { theme: payload.theme.toLowerCase(), accent: payload.accent, density: payload.density, auto_save: payload.autoSave },
                {
                    preserveScroll: true,
                    preserveState: true,
                    onBefore: () => setIsLoading(true),
                    onFinish: () => {
                        setThemeNext(payload.theme.toLowerCase());
                        setIsLoading(false);
                    },
                    onError: () => setError('Something went wrong, try again later.'),
                },
            );
        } catch (e) {
            console.error(e);
            setError('Something went wrong, try again later.');
        }
    };

    return (
        <>
            <ModalDeleteAccont setShow={setShowModalDeleteAccount} show={showModalDeleteAccount} />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <TopNav profile={profile} />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mt-8 flex flex-col gap-6 md:flex-row">
                        <Sidebar active="settings" />

                        <main className="flex-1">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
                                    <p className="mt-1 text-sm text-gray-500">Configure Zenkues to match your workflow and preferences.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <General
                                    autoSave={autoSave}
                                    setAutoSave={setAutoSave}
                                    privacy={privacy}
                                    setPrivacy={setPrivacy}
                                    language={language}
                                    setLanguage={setLanguage}
                                />

                                <Appearance
                                    theme={theme}
                                    setTheme={setTheme}
                                    accent={accent}
                                    setAccent={setAccent}
                                    density={density}
                                    setDensity={setDensity}
                                />

                                <Notifications
                                    emailNotifications={emailNotifications}
                                    setEmailNotifications={setEmailNotifications}
                                    responseAlerts={responseAlerts}
                                    setResponseAlerts={setResponseAlerts}
                                    systemUpdates={systemUpdates}
                                    setSystemUpdates={setSystemUpdates}
                                />

                                <Account setShowModalDelete={setShowModalDeleteAccount} />
                            </div>

                            <Divider />

                            <div className="sticky bottom-0 z-20 mt-6 flex w-full justify-end bg-transparent md:static">
                                <div className="w-full md:w-auto">
                                    <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm md:justify-end dark:bg-gray-900">
                                        <div className="hidden md:block">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Changes are saved to your local settings. Click save to persist.
                                            </p>
                                        </div>
                                        <div className="ml-4 flex gap-3">
                                            <button
                                                onClick={() => window.location.reload()}
                                                disabled={isLoading}
                                                className="cursor-pointer rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSave}
                                                disabled={isLoading}
                                                className="cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-indigo-400"
                                            >
                                                Save changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;
