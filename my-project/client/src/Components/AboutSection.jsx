import React from 'react';

const AboutSection = () => {
    return (
        <div>
            <section className="bg-gray-200 mx-5 my-10 py-16 px-6 md:px-20">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">

                    {/* Text Content */}
                    <div className="md:w-1/2">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                            We’re more than just a job board — we’re your career companion. Our platform helps you
                            explore opportunities, connect with top employers, and take the next step in your
                            professional journey with confidence.
                        </p>

                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <span className="text-[#6A38C2] text-xl">✔</span>
                                <span className="text-gray-700">Thousands of curated job postings</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#6A38C2] text-xl">✔</span>
                                <span className="text-gray-700">Advanced filtering and AI job matching</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-[#6A38C2] text-xl">✔</span>
                                <span className="text-gray-700">Resume building and interview tips</span>
                            </li>
                        </ul>
                    </div>

                    {/* Image Content */}
                    <div className="md:w-1/2">
                        <img
                            src="../../public/team.jpg"
                            alt="Team working together"
                            className="w-full rounded-2xl shadow-lg"
                        />
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutSection;