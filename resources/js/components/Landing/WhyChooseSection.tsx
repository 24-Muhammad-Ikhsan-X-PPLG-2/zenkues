import React from 'react';

const WhyChooseSection = () => {
    return (
        <>
            <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-white p-4 text-center text-gray-600 shadow-sm">
                    <div className="mb-1 font-semibold">Easy to use</div>
                    <div className="text-sm">Minimal learning curve for everyone.</div>
                </div>
                <div className="rounded-lg bg-white p-4 text-center text-gray-600 shadow-sm">
                    <div className="mb-1 font-semibold">Secure</div>
                    <div className="text-sm">Privacy-first with role-based access.</div>
                </div>
                <div className="rounded-lg bg-white p-4 text-center text-gray-600 shadow-sm">
                    <div className="mb-1 font-semibold">Fast performance</div>
                    <div className="text-sm">Lightweight UI built for speed.</div>
                </div>
                <div className="rounded-lg bg-white p-4 text-center text-gray-600 shadow-sm">
                    <div className="mb-1 font-semibold">Works on all devices</div>
                    <div className="text-sm">Responsive forms and editor for mobile and desktop.</div>
                </div>
            </section>
        </>
    );
};

export default WhyChooseSection;
