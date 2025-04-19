import React from 'react';
import {FaSearch} from "react-icons/fa";

const JobSearchSection = () => {
    return (
        <section className="bg-gray-300 mx-5 py-8 px-4 shadow-xl ">
            <div className='text-center'>
                <div className='flex flex-col gap-5 my-10'>
                    <span className='  px-4 py-2 text-5xl font-bold  text-Black'>Find Your Jobs</span>
                    <hr className="mx-30 border-t-4 border-blue-900"/>

                    <h1 className='text-5xl font-bold'>Search, Apply & <br/> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
                    </h1>
                    <p>Discover a platform where job searching is made simple.
                        Whether you're a fresh graduate or an experienced professional, we help you search, apply,
                        and land your dream job effortlessly. Your next opportunity is just a click away.</p>
                    <div
                        className='flex w-[60%] h-15 shadow-lg border border-blue-900 pl-3 rounded-full items-center gap-4 mx-auto'>
                        <input
                            type="text"
                            placeholder='Find your dream jobs'

                            className='outline-none border-none w-full'

                        />
                        <button className="rounded-r-full bg-[#6A38C2] p-4 h-15 text-white">
                            <FaSearch className="w-5 h-5"/>
                        </button>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default JobSearchSection;