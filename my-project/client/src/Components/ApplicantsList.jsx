import React, { useEffect, useState } from "react";
import { getApplicants, updateApplicationStatus } from "../apiRequest/api";
import { ErrorToast, SuccessToast } from "../Helper/helper";

const ApplicantsList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const res = await getApplicants();
                if (res.success) {
                    setJobs(res.Job); // direct assignment since each object is a flattened structure
                }
            } catch (err) {
                ErrorToast("Failed to load applicants");
                console.error(err);
            }
        };
        fetchApplicants();
    }, []);

    const handleStatusChange = async (appId, newStatus, index) => {
        try {
            const res = await updateApplicationStatus(appId, { status: newStatus });
            if (res.success) {
                SuccessToast("Status updated");
                setJobs(prev => {
                    const updated = [...prev];
                    updated[index].applicant.status = newStatus;
                    return updated;
                });
            } else {
                ErrorToast("Update failed");
            }
        } catch (error) {
            ErrorToast("Something went wrong");
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 px-4">
            <h2 className="text-2xl font-bold mb-6">Applicants Overview</h2>
            {jobs.length > 0 ? (
                <table className="w-full text-sm border border-gray-300 shadow-sm">
                    <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-2">Job Title</th>
                        <th className="p-2">Company</th>
                        <th className="p-2">Photo</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Resume</th>
                        <th className="p-2">Applied At</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Update</th>
                    </tr>
                    </thead>
                    <tbody>
                    {jobs.map((job, index) => (
                        <tr key={`${job._id}-${job.applicant._id}`} className="border-t bg-white hover:bg-gray-50">
                            <td className="p-2">{job.title}</td>
                            <td className="p-2">{job.company?.name || "Unknown Company"}</td>
                            <td className="p-2">
                                {job.user?.img ? (
                                    <img
                                        src={`http://localhost:5050/upload-file/${job.user.img}`}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-500">N/A</span>
                                )}
                            </td>
                            <td className="p-2">
                                {job.user?.firstName || "Unknown"} {job.user?.lastName || ""}
                            </td>
                            <td className="p-2">
                                {job.profile?.resume ? (
                                    <a
                                        href={`http://localhost:5050${job.profile.resume}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        View
                                    </a>
                                ) : (
                                    "N/A"
                                )}
                            </td>
                            <td className="p-2">
                                {new Date(job.applicant.createdAt).toLocaleString()}
                            </td>
                            <td className="p-2 capitalize">{job.applicant.status}</td>
                            <td className="p-2">
                                <select
                                    value={job.applicant.status}
                                    onChange={(e) =>
                                        handleStatusChange(job.applicant._id, e.target.value, index)
                                    }
                                    className="border rounded px-2 py-1 text-xs"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="accepted">Accepted</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600 mt-6">No applicants found.</p>
            )}
        </div>
    );
};

export default ApplicantsList;
