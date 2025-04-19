import React, { useRef, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { ErrorToast, IsEmpty, SuccessToast } from "../Helper/helper.js";
import { fileUpload, register } from "../apiRequest/api.js";
import Loading from "./Loading.jsx";

const RegisterForm = () => {
    const emailRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const passwordRef = useRef();
    const phoneRef = useRef();

    const roleJobSeekerRef = useRef(null);
    const roleRecruiterRef = useRef(null);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const fileUploadFun = async () => {
        if (!file) {
            ErrorToast("Please select a file");
            return;
        }
        const formData = new FormData();
        formData.append("file", file);
        const result = await fileUpload(formData);
        console.log(result);
        return result?.data?.file;
    };

    const submitData = async () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const phone = phoneRef.current.value;
        let role = "";

        console.log(email, password, firstName, lastName, phone);

        if (roleJobSeekerRef.current.checked) {
            role = roleJobSeekerRef.current.value;
        } else if (roleRecruiterRef.current.checked) {
            role = roleRecruiterRef.current.value;
        }

        const img = await fileUploadFun();

        console.log(email, password, firstName, lastName, phone,img);

        if (IsEmpty(email)) {
            ErrorToast("Email is required.");
        } else if (IsEmpty(password)) {
            ErrorToast("Password is required.");
        } else if (IsEmpty(firstName)) {
            ErrorToast("First Name is required.");
        } else if (IsEmpty(lastName)) {
            ErrorToast("Last Name is required.");
        } else if (IsEmpty(phone)) {
            ErrorToast("Phone is required.");
        } else if (IsEmpty(img)) {
            ErrorToast("Image is required.");
        } else if (IsEmpty(role)) {
            ErrorToast("Role is required.");
        } else {
            setLoading(true);
            const reqBody = { email, password, firstName, lastName, phone, img, role };
            const result = await register(reqBody);

            if (result === true) {
                SuccessToast("Register Successful.");
                navigate("/");
                setLoading(false);
            }
        }
    };

    return (
        <div className="mt-5">
            <section className="rounded-md p-4 bg-gray-100 flex justify-center">
                {loading && <Loading />}
                <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
                        Create Your Account
                    </h2>
                    <p className="text-center text-gray-600 mb-6">
                        Already have an account?{" "}
                        <NavLink to="/login" className="text-blue-600 hover:underline">
                            Sign In
                        </NavLink>
                    </p>

                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    ref={firstNameRef}
                                    name="first_name"
                                    type="text"
                                    placeholder="First Name"
                                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-400 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    ref={lastNameRef}
                                    name="last_name"
                                    type="text"
                                    placeholder="Last Name"
                                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-400 outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    ref={emailRef}
                                    name="email"
                                    type="email"
                                    placeholder="example@mail.com"
                                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-400 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    ref={phoneRef}
                                    name="phone"
                                    type="tel"
                                    placeholder="+880"
                                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-400 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Registering As</label>
                            <div className="flex items-center space-x-6">
                                <label className="flex items-center space-x-2">
                                    <input
                                        ref={roleJobSeekerRef}
                                        type="radio"
                                        name="role"
                                        value="job_seeker"
                                        className="text-black focus:ring-gray-500"
                                    />
                                    <span className="text-sm text-gray-700">Job Seeker</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        ref={roleRecruiterRef}
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        className="text-black focus:ring-gray-500"
                                    />
                                    <span className="text-sm text-gray-700">Recruiter</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                ref={passwordRef}
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-gray-400 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                            <input
                                onChange={(e) => setFile(e.target.files[0])}
                                name="avatar"
                                type="file"
                                className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0 file:text-sm file:font-semibold
                                file:bg-gray-700 file:text-white hover:file:bg-gray-600"
                            />
                        </div>

                        <div>
                            <button
                                onClick={submitData}
                                type="button"
                                className="w-full bg-black text-white py-2.5 rounded-md font-semibold hover:bg-gray-500 transition duration-200"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default RegisterForm;
