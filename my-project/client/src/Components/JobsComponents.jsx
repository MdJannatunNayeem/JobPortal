import React, { useState, useEffect } from 'react';
import { FindAllJobs } from '../apiRequest/api.js';
import {useNavigate} from "react-router-dom";

const JobComponents = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [locations, setLocations] = useState([]);
    const [titles, setTitles] = useState([]);

    const navigate=useNavigate();

    const fetchJobs = async () => {
        const res = await FindAllJobs();
        const jobsData = res.jobs;

        setJobs(jobsData);
        setFilteredJobs(jobsData);

        // dynamic
        const uniqueLocations = [...new Set(jobsData.map(job => job.location))];
        const uniqueTitles = [...new Set(jobsData.map(job => job.title))];

        setLocations(uniqueLocations);
        setTitles(uniqueTitles);
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    useEffect(() => {
        const result = jobs.filter(job =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredJobs(result);
    }, [searchTerm, jobs]);

    const handleFilter = (key, value) => {
        const result = jobs.filter(job => job[key] === value);
        setFilteredJobs(result);
    };

    return (
        <div className="flex gap-6 px-6 py-4">
            <div className="w-64 bg-gray-100 rounded p-4 space-y-4 text-sm">
                <h3 className="font-semibold text-lg">Filter Jobs</h3>

                <div>
                    <h4 className="font-medium mb-1">Location</h4>
                    {locations.map((loc) => (
                        <div key={loc}>
                            <input type="radio" name="location" onChange={() => handleFilter("location", loc)} />
                            <span className="ml-2">{loc}</span>
                        </div>
                    ))}
                </div>

                <div>
                    <h4 className="font-medium mb-1">Title</h4>
                    {titles.map((title) => (
                        <div key={title}>
                            <input type="radio" name="title" onChange={() => handleFilter("title", title)} />
                            <span className="ml-2">{title}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        className="w-full border rounded px-3 py-2"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredJobs.map((job) => (
                        <div key={job._id} className="bg-gray-200 shadow-xl rounded p-4 relative">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-md">{job.title}</h4>
                                    <img
                                        src={`http://localhost:5050/upload-file/${job.company?.logo}`}
                                        alt={`${job.company.name} logo`}
                                        className="w-14 h-14 rounded-md object-cover"
                                    />
                                    <p className="text-sm text-gray-600">{job.company?.name || "Company"}</p>
                                    <p className="text-xs mt-1">{job.description.slice(0, 60)}...</p>
                                </div>

                            </div>

                            <div className="flex flex-wrap gap-2 mt-3 text-xs">
                                <span className="bg-purple-400 px-2 py-1 rounded-full">{job.position} positions</span>
                                <span className="bg-red-200 px-2 py-1 rounded-full">{job.jobType}</span>
                                <span className="bg-blue-300 px-2 py-1 rounded-full">{job.salary} Dollars</span>
                            </div>

                            <div className="mt-4 flex gap-3">
                                <button
                                    onClick={()=>{navigate(`/job-details/${job._id}`)}}
                                    className="border border-gray-300 px-3 py-1 rounded
                                text-sm hover:bg-green-400 hover:text-white">Details</button>
                                <button className="bg-purple-600 text-white px-3 py-1 rounded text-sm
                                hover:bg-red-600 hover:text-white">Apply</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JobComponents;
