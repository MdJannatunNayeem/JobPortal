import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getProfile, userDetails} from "../apiRequest/api.js";

const ProfileComponents = () => {
    const navigate = useNavigate();
    const {userId} = useParams();
    const [user, setUser] = useState({});
    /*let user = {
        name: "John Doe",
        email: "john@example.com",
        profileImage: "/uploads/john.jpg",
        bio: "Full Stack Developer passionate about open source.",
        skills: "",//["React", "Node.js", "MongoDB"],
        resume: "/uploads/resumes/john_resume.pdf",
        resumeOriginalName: "John_Doe_Resume.pdf",
        company: {
            name: "Tech Corp"
        }
    };*/
     //console.log(userId);

    useEffect(() => {
        (async () => {
            try {
                const result = await getProfile(userId);
                if (result?.profile && result.profile.length > 0) {
                    setUser(result.profile[0]);  // Setting the first profile object
                    console.log("enter result", result.profile);
                }


            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        })();
    },[userId]);
    console.log("user show",user);



    // Simulated completeness: could be calculated based on filled fields
    const getResumeCompletion = () => {
        let filled = 0;
        if (user?.bio) filled += 1;
        if (user?.skills?.length) filled += 1;
        if (user?.resume) filled += 1;
        return Math.round((filled / 3) * 100);
    };

    const resumeCompletion = getResumeCompletion();
    return (
        <div className="max-w-4xl mx-auto my-3 p-6 bg-gray-200 shadow-lg rounded-2xl mt-8 relative">

            {/* Edit Button */}
            <button
                onClick={() => navigate(`/${userId}/update`)}
                className="absolute top-4 right-4 px-4 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Edit
            </button>

            {/* Header */}
            <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-500">
                    <img
                        src={`http://localhost:5050/upload-file/${user?.user?.img}`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">{user?.user?.firstname} {user?.user?.lastname}</h2>
                    <p className="text-sm text-gray-500">{user?.user?.email}</p>
                </div>
            </div>

            {/* Bio */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Bio</h3>
                <p className="text-gray-600">{user?.bio || 'No bio provided.'}</p>
            </div>

            {/* Skills */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Skills</h3>
                {user?.skills?.length ? (
                    <div className="flex flex-wrap gap-2">
                        {user?.skills.map((skill, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                            >
                {skill}
              </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">No skills listed.</p>
                )}
            </div>

            {/* Resume */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Resume</h3>
                {user?.resume ? (
                    <a
                        href={`http://localhost:5050${user?.resume}`}
                        download={user?.resumeOriginalName}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {user?.resumeOriginalName || 'Download Resume'}
                    </a>
                ) : (
                    <p className="text-gray-600">No resume uploaded.</p>
                )}

                {/* Progress Bar */}
                <div className="mt-3">
                    <p className="text-sm text-gray-500 mb-1">Profile Completion</p>
                    <div className="w-full bg-white h-3 rounded-full">
                        <div
                            className="h-full bg-blue-500 rounded-full transition-all duration-300"
                            style={{ width: `${resumeCompletion}%` }}
                        />
                    </div>
                    <p className="text-xs mt-1 text-gray-600">{resumeCompletion}% Complete</p>
                </div>
            </div>

            {/* Company */}
            {user?.company && (
                <div className="mb-2">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Company</h3>
                    <p className="text-gray-600">{ user?.company?.name|| 'Company info not available.'}</p>
                </div>
            )}
        </div>
    );
};

export default ProfileComponents;
