import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {getCompanyByUser, getProfile, updateProfile} from '../apiRequest/api.js';

const EditProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        bio: '',
        skills: '',
        company: '',
        resume: null,
    });
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const result = await getProfile(userId);
                const profile = result?.profile?.[0];
                if (profile) {
                    setFormData({
                        bio: profile.bio || '',
                        skills: profile.skills?.join(', ') || '',
                        company: profile.company || '',
                        resume: null, // resume upload field remains empty
                    });

                    const companyList = await getCompanyByUser();
                    setCompanies(companyList);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        })();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'resume') {
            const file = files[0];
            setFormData({ ...formData, resume: file });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.bio.trim() || !formData.skills.trim()) {
            alert('Please fill in required fields.');
            return;
        }

        try {
            const data = new FormData();
            data.append('bio', formData.bio);
            data.append('skills', JSON.stringify(formData.skills.split(',').map(s => s.trim())));
            data.append('company', formData.company);
            if (formData.resume) {
                data.append('file', formData.resume);
            }

            await updateProfile(userId, data);
            alert('Profile updated successfully!');
            navigate(`/${userId}`);
        } catch (err) {
            console.error('Failed to update profile:', err);
            alert('Something went wrong while updating the profile.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-4 p-4 bg-gray-200 shadow-md rounded-md text-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Edit Profile</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label className="block text-gray-700 mb-1">Bio</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded focus:outline-none focus:ring focus:border-blue-400 text-sm"
                        rows="3"
                        required
                    ></textarea>
                </div>

                <div>
                    <label className="block text-gray-700 mb-1">Skills (comma-separated)</label>
                    <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded focus:outline-none focus:ring focus:border-blue-400 text-sm"
                        required
                    />
                </div>

                {/* Company Dropdown */}
                <div>
                    <label className="block text-gray-700 mb-1">Company</label>
                    <select
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded focus:outline-none focus:ring focus:border-blue-400 text-sm"
                    >
                        <option value="">Select a company</option>
                        {companies?.data?.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 mb-1">Resume</label>
                    <input
                        type="file"
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleChange}
                        className="w-full border px-2 py-1 rounded text-sm file:bg-green-600 file:text-white file:rounded-md file:px-4 file:py-2"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition text-sm"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
