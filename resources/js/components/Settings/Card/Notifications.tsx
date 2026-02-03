import React, { FC } from 'react';
import Card from '../Card';
import Toggle from '../Toggle';

type NotificationsProps = {
    emailNotifications: boolean;
    setEmailNotifications: (v: boolean) => void;
    responseAlerts: boolean;
    setResponseAlerts: (v: boolean) => void;
    systemUpdates: boolean;
    setSystemUpdates: (v: boolean) => void;
};

const Notifications: FC<NotificationsProps> = ({
    emailNotifications,
    setEmailNotifications,
    responseAlerts,
    setResponseAlerts,
    systemUpdates,
    setSystemUpdates,
}) => {
    return (
        <>
            <Card title="Notifications" description="Control how you receive updates">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-800">Email notifications</p>
                        <p className="mt-1 text-xs text-gray-500">Receive updates and newsletters by email.</p>
                    </div>
                    <Toggle checked={emailNotifications} onChange={setEmailNotifications} />
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-800">Form response alerts</p>
                        <p className="mt-1 text-xs text-gray-500">Get notified when new responses arrive.</p>
                    </div>
                    <Toggle checked={responseAlerts} onChange={setResponseAlerts} />
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-800">System updates</p>
                        <p className="mt-1 text-xs text-gray-500">Automatically apply minor updates and fixes.</p>
                    </div>
                    <Toggle checked={systemUpdates} onChange={setSystemUpdates} />
                </div>
            </Card>
        </>
    );
};

export default Notifications;
