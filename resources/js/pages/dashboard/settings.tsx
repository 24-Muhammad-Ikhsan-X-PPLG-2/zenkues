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

type SettingsProps = {
    profile: User;
};

const Settings: FC<SettingsProps> = ({ profile }) => {
    // General
    const [autoSave, setAutoSave] = useState(true);
    const [privacy, setPrivacy] = useState('Private');
    const [language, setLanguage] = useState('English');

    // Appearance
    const [theme, setTheme] = useState('Light');
    const [accent, setAccent] = useState('#6366f1');
    const [density, setDensity] = useState('Comfortable');

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
        console.log('Save settings', payload);
        alert('Settings saved');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <TopNav profile={profile} />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mt-8 flex flex-col gap-6 md:flex-row">
                    <Sidebar active="settings" />

                    <main className="flex-1">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
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

                            <Account />
                        </div>

                        <Divider />

                        <div className="sticky bottom-0 z-20 mt-6 flex w-full justify-end bg-transparent md:static">
                            <div className="w-full md:w-auto">
                                <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm md:justify-end">
                                    <div className="hidden md:block">
                                        <p className="text-sm text-gray-500">Changes are saved to your local settings. Click save to persist.</p>
                                    </div>
                                    <div className="ml-4 flex gap-3">
                                        <button
                                            onClick={() => window.location.reload()}
                                            className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
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
    );
};

export default Settings;
