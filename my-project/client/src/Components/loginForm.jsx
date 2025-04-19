import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { ErrorToast, IsEmpty } from "../Helper/helper.js";
import { login } from "../apiRequest/api.js";
import Loading from "./Loading.jsx";

const LoginForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({email: "", password: "", role: ""});



    const submitData = async (e) => {
        e.preventDefault();

        if (IsEmpty(data.email)) {
            ErrorToast("Email is required.");
        } else if (IsEmpty(data.password)) {
            ErrorToast("Password is required.");
        } else if (IsEmpty(data.role)) {
            ErrorToast("Please select a role.");
        } else {
            setLoading(true);
            console.log("Login data:", data);
            let result = await login(data);
            if (result === true) {
                navigate("/");
            }
            setLoading(false);
        }
    };

    return (
        <section className="rounded-md p-2 shadow-xl bg-gray-200 flex justify-center my-[5px]">
            {loading && <Loading />}
            <div className="flex bg-white items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
                <div className="xl:mx-auto xl:w-full shadow-md p-4 xl:max-w-sm 2xl:max-w-md">
                    <div className="mb-2 flex justify-center" />
                    <h2 className="text-center text-2xl font-bold leading-tight text-black">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Don't have an account? Create a free account
                    </p>
                    <form className="mt-8" method="POST" action="#">
                        <div className="space-y-5">
                            <div>
                                <label className="text-base font-medium text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                        value={data.email}
                                        placeholder="Email"
                                        type="email"
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="text-base font-medium text-gray-900">
                                        Password
                                    </label>
                                    <a
                                        className="text-sm font-semibold text-black hover:underline"
                                        href="#"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) => setData({ ...data, password: e.target.value })}
                                        value={data.password}
                                        placeholder="Password"
                                        type="password"
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    />
                                </div>
                            </div>

                            {/* Role Selection */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="job_seeker"
                                            checked={data.role === 'job_seeker'}
                                            onChange={(e) => setData({ ...data, role: e.target.value })}
                                            className="cursor-pointer"
                                        />
                                        <label htmlFor="job_seeker">Job Seeker</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            checked={data.role === 'recruiter'}
                                            onChange={(e) => setData({ ...data, role: e.target.value })}
                                            className="cursor-pointer"
                                        />
                                        <label htmlFor="recruiter">Recruiter</label>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button
                                    onClick={submitData}
                                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-green-600"
                                    type="submit"
                                >
                                    Log In
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LoginForm;
