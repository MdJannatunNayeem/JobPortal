import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { applyToJob, getJobById } from "../apiRequest/api.js";
import { ErrorToast, SuccessToast } from "../Helper/helper.js";

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [isApplied, setIsApplied] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await getJobById(id);
                setJob(res.jobs);

                const userId = localStorage.getItem("id");
                const alreadyApplied = res.jobs?.applications?.some(appId => appId.toString() === userId);
                setIsApplied(alreadyApplied);
            } catch (error) {
                console.error("Failed to fetch job", error);
            }
        };
        fetchJob();
    }, [id]);

    const handleApply = async (e) => {
        e.preventDefault();
        if (isApplied) return;

        const confirmApply = window.confirm("Are you sure you want to apply for this job?");
        if (!confirmApply) return;

        try {
            const res = await applyToJob(id);
            if (res.success) {
                SuccessToast("Applied successfully!");
                setIsApplied(true);

                const userId = localStorage.getItem("id");
                setJob(prevJob => ({
                    ...prevJob,
                    applications: [...(prevJob.applications || []), userId]
                }));
            } else {
                ErrorToast(res.message || "Failed to apply");
            }
        } catch (err) {
            ErrorToast(err.message);
            console.error(err);
        }
    };

    if (!job) return <p className="text-center py-6">Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto bg-gray-300 shadow-xl rounded p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">{job.title}</h2>
            <table className="w-full text-sm text-left table-auto border border-gray-200">
                <tbody>
                <Row label="Job Type" value={job.jobType} />
                <Row label="Location" value={job.location} />
                <Row label="Salary" value={`${job.salary} $`} />
                <Row label="Experience Level" value={`${job.experienceLevel} years`} />
                <Row label="Open Positions" value={job.position} />
                <Row label="Description" value={job.description} />
                <Row
                    label="Requirements"
                    value={
                        <ul className="list-disc ml-5">
                            {job.requirements.map((r, i) => <li key={i}>{r}</li>)}
                        </ul>
                    }
                />
                <Row label="Created At" value={new Date(job.createdAt).toLocaleString()} />
                <Row
                    label="Applications"
                    value={
                        <button
                            onClick={handleApply}
                            className={`px-3 py-1 rounded text-sm transition ${
                                isApplied
                                    ? "bg-gray-400 text-white cursor-not-allowed"
                                    : "bg-purple-600 text-white hover:bg-red-600"
                            }`}
                            disabled={isApplied}
                        >
                            {isApplied ? "Applied" : "Apply"}
                        </button>
                    }
                />
                </tbody>
            </table>
        </div>
    );
};

const Row = ({ label, value }) => (
    <tr className="border-t">
        <td className="px-4 py-2 font-medium text-gray-600 w-1/3">{label}</td>
        <td className="px-4 py-2">{value}</td>
    </tr>
);

export default JobDetails;
