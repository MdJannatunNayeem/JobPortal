import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {ErrorToast, IsEmpty, SuccessToast} from "../Helper/helper.js";
import {companyRegister, fileUpload, register} from "../apiRequest/api.js";
import Loading from "./Loading.jsx";

const SetCompanyForm = () => {


    const nameRef = useRef();
    const descriptionRef=useRef();
    const websiteRef =useRef();
    const locationRef =useRef();

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
        return result?.data?.file?.filename;
    };

    const submitData = async () => {
        const name = nameRef.current.value;
        const description = descriptionRef.current.value;
        const website = websiteRef.current.value;
        const location = locationRef.current.value;


        //console.log(email, password, firstName, lastName, phone);


        const logo = await fileUploadFun();

        // console.log(email, password, firstName, lastName, phone,img);

        if (IsEmpty(name)) {
            ErrorToast("Company name is required.");
        } else if (IsEmpty(description)) {
            ErrorToast("Description is required.");
        } else if (IsEmpty(website)) {
            ErrorToast("Website is required.");
        } else if (IsEmpty(location)) {
            ErrorToast("Location is required.");
        } else if (IsEmpty(logo)) {
            ErrorToast("Logo is required.");
        } else {
            setLoading(true);
            const reqBody = {name, description, website, location, logo};
            console.log("req" , reqBody);
            const result = await companyRegister(reqBody);

            if (result === true) {
                SuccessToast("Set Company Successful.");
                navigate("/");
                setLoading(false);
            }
        }
    };



    return (
        <div>
            {loading && <Loading />}
            <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto  px-8 bg-gray-200 rounded-lg shadow-lg space-y-4">

                <h2 className="text-xl font-semibold text-center text-gray-700">Register Your Company</h2>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-600">Company Name</label>
                    <input
                        type="text"
                        name="name"
                        ref={nameRef}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-600">Description</label>
                    <input
                        type="text"
                        name="description"
                        ref={descriptionRef}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-600">Website</label>
                    <input
                        type="text"
                        name="website"
                        ref={websiteRef}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-600">Location</label>
                    <input
                        type="text"
                        name="location"
                        ref={locationRef}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-600">Company Logo</label>
                    <input
                        type="file"
                        name="logo"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="w-full p-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500
               file:bg-indigo-600 file:text-white file:border-none file:rounded-md file:px-4 file:py-2 file:cursor-pointer"
                    />

                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        onClick={submitData}
                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-indigo-700"
                    >
                    Register Company
                    </button>
                </div>
            </form>

        </div>
    );


};

export default SetCompanyForm;