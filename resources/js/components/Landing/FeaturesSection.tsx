import React from 'react';

const FeaturesSection = () => {
    return (
        <>
            <section className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 font-bold text-purple-600">
                        ↕
                    </div>
                    <div>
                        <div className="font-semibold">Drag-and-drop builder</div>
                        <div className="text-sm text-gray-500">Build forms visually with instant previews.</div>
                    </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 font-bold text-purple-600">
                        ⏱
                    </div>
                    <div>
                        <div className="font-semibold">Real-time responses</div>
                        <div className="text-sm text-gray-500">See submissions live and explore analytics.</div>
                    </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 font-bold text-purple-600">
                        🎨
                    </div>
                    <div>
                        <div className="font-semibold">Custom themes</div>
                        <div className="text-sm text-gray-500">Choose or create themes to match your brand.</div>
                    </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 font-bold text-purple-600">
                        👥
                    </div>
                    <div>
                        <div className="font-semibold">Collaboration tools</div>
                        <div className="text-sm text-gray-500">Invite teammates to edit in real-time.</div>
                    </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 font-bold text-purple-600">
                        ⬇️
                    </div>
                    <div>
                        <div className="font-semibold">Data export</div>
                        <div className="text-sm text-gray-500">Export CSV, Excel, and integrate with tools.</div>
                    </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 font-bold text-purple-600">
                        🔒
                    </div>
                    <div>
                        <div className="font-semibold">Secure by default</div>
                        <div className="text-sm text-gray-500">Encrypted responses and access controls.</div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FeaturesSection;
