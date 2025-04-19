import React, {useEffect, useState} from "react";
import axios from "axios";
import {ErrorToast, SuccessToast} from "../Helper/helper.js";
import {getCompanyByUser, getProfile, postAJob} from "../apiRequest/api.js";
import {useNavigate} from "react-router-dom";

const PostAJob = () => {
    const [companies, setCompanies] = useState([]);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        experienceLevel: "",
        location: "",
        jobType: "",
        position: "",
        companyId: "",
    });


    useEffect(() => {
        (async () => {
            try {
                    const companyList = await getCompanyByUser();
                    setCompanies(companyList);

            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        })();
    }, []);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await postAJob(formData);

            if (response.status) {

                SuccessToast(response.message);
                navigate ('/');
            } else {
               ErrorToast("Job post failed!");
            }
        } catch (error) {
            console.error("Error posting job:", error);
            alert("Server error. Please try again later.");
        }
    };

    return (
        <div className="max-w-sm mx-auto p-4 my-6 bg-gray-200 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-center text-gray-800">Create Job</h2>
            <form onSubmit={handleSubmit} className="space-y-3 text-sm">
                <input
                    type="text"
                    name="title"
                    placeholder="Job Title"
                    className="w-full px-3 py-1.5 border rounded"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Job Description"
                    rows={2}
                    className="w-full px-3 py-1.5 border rounded resize-none"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="requirements"
                    placeholder="Requirements (comma-separated)"
                    className="w-full px-3 py-1.5 border rounded"
                    value={formData.requirements}
                    onChange={handleChange}
                    required
                />
                <div className="flex gap-2">
                    <input
                        type="number"
                        name="salary"
                        placeholder="Salary"
                        className="w-1/2 px-3 py-1.5 border rounded"
                        value={formData.salary}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="experienceLevel"
                        placeholder="Experience (yrs)"
                        className="w-1/2 px-3 py-1.5 border rounded"
                        value={formData.experienceLevel}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        className="w-1/2 px-3 py-1.5 border rounded"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="jobType"
                        placeholder="Job Type"
                        className="w-1/2 px-3 py-1.5 border rounded"
                        value={formData.jobType}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex gap-2">
                    <input
                        type="number"
                        name="position"
                        placeholder="Position"
                        className="w-1/2 px-3 py-1.5 border rounded"
                        value={formData.position}
                        onChange={handleChange}
                        required
                    />
                    {/*company id*/}

                    <div className="w-1/2">

                        <select
                            name="companyId"
                            value={formData.companyId}
                            onChange={handleChange}
                            className="w-full border px-2 py-1 rounded focus:outline-none focus:ring focus:border-blue-400 text-sm"
                            required
                        >
                            <option value="">Select a company</option>
                            {companies?.data?.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-1.5 rounded hover:bg-indigo-700 transition"
                >
                    Post Job
                </button>
            </form>
        </div>
    );
};

export default PostAJob;
