import React from 'react';

const TestimonialsSection = () => {
    return (
        <>
            <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex rounded-lg bg-white p-4 shadow-md">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 font-semibold text-purple-600">AL</div>
                        <div>
                            <div className="font-semibold">Alex L., Researcher</div>
                            <div className="text-sm text-gray-500">"Zenkues made running my study so much easier — clean UI and fast results."</div>
                        </div>
                    </div>
                </div>

                <div className="flex rounded-lg bg-white p-4 shadow-md">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 font-semibold text-purple-600">SM</div>
                        <div>
                            <div className="font-semibold">Sana M., Educator</div>
                            <div className="text-sm text-gray-500">"I love the templates and collaboration features for classroom surveys."</div>
                        </div>
                    </div>
                </div>

                <div className="flex rounded-lg bg-white p-4 shadow-md">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 font-semibold text-purple-600">RK</div>
                        <div>
                            <div className="font-semibold">Ravi K., Student</div>
                            <div className="text-sm text-gray-500">"Simple, intuitive, and works great on my phone."</div>
                        </div>
                    </div>
                </div>
                <div className="flex rounded-lg bg-white p-4 shadow-md">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 font-semibold text-purple-600">IK</div>
                        <div>
                            <div className="font-semibold">Isha K., Student</div>
                            <div className="text-sm text-gray-500">"I love how easy it is to create and share surveys."</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TestimonialsSection;
