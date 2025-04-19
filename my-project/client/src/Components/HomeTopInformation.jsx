import React, {useEffect, useState} from 'react';
import {getJobSummaryStats, getProfile} from "../apiRequest/api.js";

const HomeTopInformation= () => {

    const [data, setData] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const result = await getJobSummaryStats();
                if (result.success === true) {
                  setData(result.stats);
                }


            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        })();
    })

    const stats = [
        {
            title: 'Total New Jobs',
            value: data?.totalJobPosts,
            description: 'New job postings as of March 24, 2025',
            bgColor: 'bg-blue-100',
            textColor: 'text-blue-800',
            img:'../../public/hiring.avif'
        },
        {
            title: 'Active Vacancies',
            value: data?.totalJobPositions,
            description: 'Currently active job postings',
            bgColor: 'bg-green-100',
            textColor: 'text-green-800',
            img:'../../public/vacancy.jpg'
        },
        {
            title: 'Listed Companies',
            value: data?.totalCompanies,
            description: 'Companies listed on DSE in 2025',
            bgColor: 'bg-yellow-100',
            textColor: 'text-yellow-800',
            img:'../../public/company.jpg'
        },
    ];

    return (
        <section className="py-8 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => (

                    <div
                        key={index}
                        className={`rounded-lg shadow-md p-6 ${stat.bgColor}`}
                    >
                        <div className="flex justify-center items-center">
                            <img alt="google" src={stat.img}
                                 className="w-full h-72 object-cover "
                            />
                        </div>

                        <h3 className={`text-xl font-semibold ${stat.textColor}`}>
                            {stat.title}
                        </h3>

                        <p className="text-3xl font-bold mt-2">{stat.value}</p>
                        <p className="mt-1 text-sm text-gray-600">{stat.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HomeTopInformation;
