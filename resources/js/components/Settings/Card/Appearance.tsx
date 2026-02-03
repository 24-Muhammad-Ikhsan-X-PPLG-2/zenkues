import React, { FC } from 'react';
import Card from '../Card';
import Select from '../Select';
import ColorSwatch from '../ColorSwatch';

type AppearanceProps = {
    theme: string;
    setTheme: (v: string) => void;
    accent: string;
    setAccent: (v: string) => void;
    density: string;
    setDensity: (v: string) => void;
};

const Appearance: FC<AppearanceProps> = ({ theme, setTheme, accent, setAccent, density, setDensity }) => {
    return (
        <>
            <Card title="Appearance" description="Control theme, color, and UI density">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-800">Theme</p>
                        <p className="mt-1 text-xs text-gray-500">Light, dark, or follow system preference.</p>
                    </div>
                    <Select value={theme} onChange={setTheme} options={['Light', 'Dark', 'System']} />
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-800">Accent color</p>
                        <p className="mt-1 text-xs text-gray-500">Pick an accent color used throughout the UI.</p>
                    </div>
                    <ColorSwatch value={accent} onChange={setAccent} colors={['#6366f1', '#7c3aed', '#06b6d4', '#2563eb', '#ef4444', '#f59e0b']} />
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-800">UI density</p>
                        <p className="mt-1 text-xs text-gray-500">Adjust spacing for comfortable or compact layouts.</p>
                    </div>
                    <Select value={density} onChange={setDensity} options={['Comfortable', 'Compact']} />
                </div>
            </Card>
        </>
    );
};

export default Appearance;
