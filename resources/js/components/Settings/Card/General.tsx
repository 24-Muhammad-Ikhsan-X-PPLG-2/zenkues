import React, { FC } from 'react';
import Card from '../Card';
import Toggle from '../Toggle';
import Select from '../Select';

type GeneralProps = {
    autoSave: boolean;
    setAutoSave: (v: boolean) => void;
    privacy: string;
    setPrivacy: (v: string) => void;
    language: string;
    setLanguage: (v: string) => void;
};

const General: FC<GeneralProps> = ({ autoSave, setAutoSave, privacy, setPrivacy, language, setLanguage }) => {
    return (
        <>
            <Card title="General" description="Basic form and account defaults">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-800">Auto-save</p>
                        <p className="mt-1 text-xs text-gray-500">Automatically save form changes as you work.</p>
                    </div>
                    <Toggle checked={autoSave} onChange={setAutoSave} />
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-800">Default privacy</p>
                        <p className="mt-1 text-xs text-gray-500">Choose default visibility for newly created forms.</p>
                    </div>
                    <Select value={privacy} onChange={setPrivacy} options={['Private', 'Team', 'Public']} />
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-800">Language</p>
                        <p className="mt-1 text-xs text-gray-500">Interface language for Zenkues.</p>
                    </div>
                    <Select value={language} onChange={setLanguage} options={['English', 'Español', 'Français', 'Deutsch']} />
                </div>
            </Card>
        </>
    );
};

export default General;
