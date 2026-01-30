import React from 'react';

const HowItWorksSection = () => {
    return (
        <>
            <section className="mt-12 flex flex-col gap-4 md:flex-row">
                <div className="flex-1 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="font-semibold">Step 1 — Create form</div>
                    <div className="mt-2 text-sm text-gray-500">Use templates or start from scratch with the visual editor.</div>
                </div>
                <div className="flex-1 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="font-semibold">Step 2 — Share link</div>
                    <div className="mt-2 text-sm text-gray-500">Distribute via URL, QR code, or embed on your site.</div>
                </div>
                <div className="flex-1 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="font-semibold">Step 3 — Collect responses</div>
                    <div className="mt-2 text-sm text-gray-500">Track answers in real-time and export results.</div>
                </div>
            </section>
        </>
    );
};

export default HowItWorksSection;
