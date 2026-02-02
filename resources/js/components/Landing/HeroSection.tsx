import { Link } from '@inertiajs/react';
import React from 'react';

const HeroSection = () => {
    return (
        <>
            <section className="flex flex-col-reverse items-center gap-12 lg:flex-row">
                <div className="lg:flex-1">
                    <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 px-3 py-1 font-semibold text-purple-600">
                        Zenkues
                    </span>
                    <h1 className="text-3xl leading-tight font-extrabold sm:text-4xl lg:text-5xl">
                        Create beautiful forms in minutes — fast, simple, collaborative.
                    </h1>
                    <p className="mt-4 max-w-xl text-base text-gray-600">
                        Build surveys, quizzes, and feedback forms with an intuitive drag-and-drop editor. Share via link, collaborate in real-time,
                        and export results easily.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link href="/register">
                            <button className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white shadow transition duration-200 hover:-translate-y-1 hover:scale-105 hover:bg-purple-700 hover:shadow-2xl">
                                Create Form
                            </button>
                        </Link>
                        <button className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-purple-100 px-4 py-2 font-semibold text-purple-600 hover:shadow-2xl transition duration-200 hover:-translate-y-1 hover:scale-105 hover:bg-purple-50">
                            Learn More
                        </button>
                    </div>
                </div>

                <div className="w-full max-w-md rounded-xl border border-gray-100 bg-gradient-to-b from-white/80 to-white/60 p-5 shadow-lg lg:w-1/2">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
                            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                        </div>
                        <div className="h-2 flex-1 rounded bg-indigo-50" />
                    </div>

                    <div className="mb-3 rounded-lg bg-white p-3">
                        <div className="font-semibold">What is your favorite study subject?</div>
                        <div className="text-sm text-gray-500">Multiple choice • required</div>
                        <div className="mt-3 flex flex-col gap-2">
                            <div className="rounded bg-gray-50 p-2">Mathematics</div>
                            <div className="rounded bg-gray-50 p-2">Science</div>
                            <div className="rounded bg-gray-50 p-2">History</div>
                        </div>
                    </div>

                    <div className="mb-3 rounded-lg bg-white p-3">
                        <div className="font-semibold">Your feedback</div>
                        <div className="text-sm text-gray-500">Short answer</div>
                        <div className="mt-3 h-10 rounded bg-gray-50" />
                    </div>

                    <div className="mt-2 flex gap-3">
                        <div className="flex h-9 flex-1 items-center justify-center rounded-lg bg-indigo-50 font-semibold">Preview</div>
                        <div className="flex h-9 w-32 items-center justify-center rounded-lg border border-gray-100 bg-white font-semibold">
                            Share
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HeroSection;
