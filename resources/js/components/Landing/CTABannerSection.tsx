import { Link } from '@inertiajs/react';
import React from 'react';

const CTABannerSection = () => {
    return (
        <section className="mt-8 flex flex-col items-center justify-between gap-4 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 p-6 sm:flex-row">
            <div>
                <div className="text-lg font-extrabold">Ready to collect feedback?</div>
                <div className="text-sm text-gray-600">Start creating forms for free — no credit card required.</div>
            </div>
            <div className="flex gap-3">
                <Link href={'/register'}>
                    <button className="cursor-pointer rounded-lg border border-transparent bg-white px-4 py-2 font-semibold text-purple-600 transition duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl">
                        Sign Up
                    </button>
                </Link>
                <button className="cursor-pointer rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white transition duration-200 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl">
                    Create Form
                </button>
            </div>
        </section>
    );
};

export default CTABannerSection;
