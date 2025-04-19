import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {getCompanyById, getCompanyByUser, updateCompany} from "../apiRequest/api.js";
import {ErrorToast, SuccessToast} from "../Helper/helper.js";

const UpdateCompanyForm = () => {
    const { id } = useParams(); // company ID from URL
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        logo: ""
    });
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);

    // Fetch existing company data
    useEffect(() => {
        (async () => {
            try {
                const response = await getCompanyById(id);

                const data = response?.data;
                if (data) {
                    setFormData({
                        name: data.name,
                        description: data.description,
                        website: data.website,
                        location: data.location,
                        logo: data.logo,
                    });
                    setPreview(`http://localhost:5050/upload-file/${data.logo}`);
                }
            } catch (err) {
                console.error("Failed to fetch company:", err);
            }
        })();
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle logo upload
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updateData = new FormData();
            updateData.append("name", formData.name);
            updateData.append("description", formData.description);
            updateData.append("website", formData.website);
            updateData.append("location", formData.location);
            if (file) updateData.append("file", file);

            const response = await updateCompany(id,updateData);


            if (response.success) {
                SuccessToast("Company updated successfully!");
                navigate("/company-recuiter");
            } else {
                ErrorToast("Failed to update company.");
            }
        } catch (error) {
            console.error("Error updating company:", error);
            alert("Something went wrong.");
        }
    };

    return (
        <>
            <div className="max-w-md mx-auto p-4 my-6 bg-gray-200 rounded-md shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">Update Company</h2>
                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    <div>
                        <label className="block text-gray-600 mb-1">Company Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-2 py-1 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={2}
                            className="w-full px-2 py-1 border rounded resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-1">Website</label>
                        <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-1">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 mb-1">Company Logo</label>
                        {preview && (
                            <div className="mb-2">
                                <img src={preview} alt="Logo Preview" className="h-12 w-12 object-cover rounded-xl"/>
                            </div>
                        )}
                        <input
                            type="file"
                            name="logo"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full text-xs  file:bg-green-600 file:text-white file:border-black file:rounded-md file:px-4 file:py-2 file:cursor-pointer"
                        />
                    </div>

                    <div className="text-center pt-2">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 text-sm"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>

        </>
    );
};

export default UpdateCompanyForm;
