import React, { useEffect, useState } from 'react';
import { getAppliedJobs } from '../apiRequest/api'; // you need to implement this in api.js
import { Link } from 'react-router-dom';

const AppliedJobs = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await getAppliedJobs();
                if (res.success) {
                    setAppliedJobs(res.applications);
                }
            } catch (error) {
                console.error("Failed to fetch applied jobs", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAppliedJobs();
    }, []);

    if (loading) return <p className="text-center py-6">Loading...</p>;

    if (appliedJobs.length === 0) {
        return <p className="text-center text-gray-600 py-10">You haven't applied for any jobs yet.</p>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4">
            <h2 className="text-2xl font-semibold mb-6">Applied Jobs</h2>
            <table className="w-full border border-gray-300 shadow">
                <thead>
                <tr className="bg-gray-100 text-left">
                    <th className="p-3">Title</th>
                    <th className="p-3">Company</th>
                    <th className="p-3">Salary</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Details</th>
                </tr>
                </thead>
                <tbody>
                {appliedJobs.map((app, index) => (
                    <tr key={index} className="border-t bg-white hover:bg-gray-50">
                        <td className="p-3">{app.job.title}</td>
                        <td className="p-3">{app.job.company.name}</td>
                        <td className="p-3">${app.job.salary}</td>
                        <td className="p-3 capitalize">{app.status || "pending"}</td>
                        <td className="p-3">
                            <Link
                                to={`/job-details/${app.job._id}`}
                                className="text-blue-600 hover:underline text-sm"
                            >
                                View
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AppliedJobs;
