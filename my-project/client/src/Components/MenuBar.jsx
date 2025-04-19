import React, {useEffect, useState} from 'react';
import {data, NavLink, useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import {login, logout, userDetails} from "../apiRequest/api.js";


const MenuBar = () => {

    let isLogin = Cookies.get("token");
   // console.log("token", isLogin);
    let navigate = useNavigate();


    const handleToggle = () => {
        setOpen(true);

        // Auto-close after 3 seconds
        setTimeout(() => {
            setOpen(false);
        }, 10000); // 3000ms = 3 seconds
    };

    let logOutFunction = async () => {
        let result = await logout();
        if (result) {
            navigate("/");
        }
    }

    const [profile, setProfile] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        (async () => {
            let result = await userDetails();
            setProfile(result);
        })();
    },[]);
    //console.log("Profile ",profile);


    return (
        <section
            className="bg-white shadow-xl flex h-[70px] justify-center items-center sticky top-0 left-0 w-full z-50">
            <div className="container mx-[30px]">
                <div className="grid grid-cols-12 gap-[30px]">
                    <div className="col-span-4 flex items-center space-x-3">
                        <div className="w-[40px] p-[5px] bg-cyan-200 rounded-full border border-cyan-400">
                            <img alt="logo" src="/img.png"/>
                        </div>
                        <span className="text-lg font-bold text-gray-800">Job Portal</span>
                    </div>

                    <div className="col-span-8">
                        <nav>
                            <ul className="flex gap-[15px] float-right mx-[20px]">
                                <li className="px-[10px] py-[5px] bg-white border-2 border-neutral-900 text-neutral-900 rounded-md hover:bg-neutral-900 hover:text-white">
                                    <NavLink to="/">Home</NavLink>
                                </li>

                                {isLogin ? (
                                    <>
                                        {profile?.data?.role === "job_seeker" ? (
                                            <li className="px-[10px] py-[5px] bg-white border-2 border-neutral-900 text-neutral-900 rounded-md hover:bg-neutral-900 hover:text-white">
                                                <NavLink to="/get-all-job">Jobs</NavLink>
                                            </li>

                                        ): (<>
                                            <li className="px-[10px] py-[5px] bg-white border-2 border-neutral-900 text-neutral-900 rounded-md hover:bg-neutral-900 hover:text-white">
                                                <NavLink to="/get-all-job">Jobs</NavLink>
                                            </li>
                                            <li className="px-[10px] py-[5px] bg-white border-2 border-neutral-900 text-neutral-900 rounded-md hover:bg-neutral-900 hover:text-white">
                                            <NavLink to="/post-job">PostAJobs</NavLink>
                                            </li>
                                            </>
                                        )}

                                        <div className="w-10 h-10 rounded-full border border-black overflow-hidden">
                                            <img
                                                alt="profile"
                                                src={`http://localhost:5050/upload-file/${profile?.data?.img}`}
                                                className="w-full h-full object-cover"
                                                onClick={handleToggle}
                                            />
                                            {open && (
                                                profile?.data?.role === "job_seeker" ? (
                                                    <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg bg-white border border-gray-200">
                                                        <ul className="py-2 text-gray-800">
                                                            <li className="px-6 py-3 hover:bg-indigo-500 hover:text-white rounded-md cursor-pointer transition-all duration-200 ease-in-out">
                                                                <NavLink to={`/${profile.data._id}`}>Profile</NavLink>
                                                            </li>
                                                            <li className="px-6 py-3 hover:bg-indigo-500 hover:text-white rounded-md cursor-pointer transition-all duration-200 ease-in-out">
                                                                <NavLink to="/applied-job">Applied Jobs</NavLink>
                                                            </li>
                                                            <li className="px-6 py-3 hover:bg-red-500 hover:text-white rounded-md cursor-pointer transition-all duration-200 ease-in-out">
                                                                <button onClick={logOutFunction}>Logout</button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                ) : (
                                                    <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg bg-white border border-gray-200">
                                                        <ul className="py-2 text-gray-800">
                                                            <li className="px-6 py-3 hover:bg-indigo-500 hover:text-white rounded-md cursor-pointer transition-all duration-200 ease-in-out">
                                                                <NavLink to={`/${profile.data._id}`}>Profile</NavLink>
                                                            </li>
                                                            <li className="px-6 py-3 hover:bg-indigo-500 hover:text-white rounded-md cursor-pointer transition-all duration-200 ease-in-out">
                                                                <NavLink to="/company-register">Set Company</NavLink>
                                                            </li>
                                                            <li className="px-6 py-3 hover:bg-indigo-500 hover:text-white rounded-md cursor-pointer transition-all duration-200 ease-in-out">
                                                                <NavLink to="/company-recuiter">Company Details</NavLink>
                                                            </li>
                                                            <li className="px-6 py-3 hover:bg-indigo-500 hover:text-white rounded-md cursor-pointer transition-all duration-200 ease-in-out">
                                                                <NavLink to="/applicants">All Posted Jobs</NavLink>
                                                            </li>
                                                            <li className="px-6 py-3 hover:bg-red-500 hover:text-white rounded-md cursor-pointer transition-all duration-200 ease-in-out">
                                                                <button onClick={logOutFunction}>Logout</button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )
                                            )}

                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <li className="px-[10px] py-[5px] bg-white border-2 border-neutral-900 text-neutral-900 rounded-md hover:bg-neutral-900 hover:text-white">
                                            <NavLink to="/login">Login</NavLink>
                                        </li>
                                        <li className="px-[10px] py-[5px] bg-white border-2 border-neutral-900 text-neutral-900 rounded-md hover:bg-neutral-900 hover:text-white">
                                            <NavLink to="/register">Register</NavLink>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MenuBar;