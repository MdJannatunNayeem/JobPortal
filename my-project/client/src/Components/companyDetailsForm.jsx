import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {deleteCompany, getCompanyByUser, getProfile} from "../apiRequest/api.js";
import {ErrorToast, SuccessToast} from "../Helper/helper.js";


const CompanyDetailsForm = () => {

    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);


    useEffect(() => {
        (async () => {
            try {
                const result = await getCompanyByUser();
                if (result?.data && result?.data.length > 0) {
                    setCompanies(result.data);  // Setting the first profile object
                    console.log("enter result", result.data);
                }


            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        })();
    },[]);



    const onEdit = (companyId) => {
        navigate(`/update-company/${companyId}`);
    };

    const onDelete=async (companyId) => {
        try {
            let result = await deleteCompany(companyId);
            if (result.status){
                SuccessToast("Delete Successfully!");
                window.location.reload();
            }
            else{
                ErrorToast("Delete unsuccessful");
            }
        }catch(error){
            console.error('Error fetching profile:', error);
        }
    }


    return (
    <div>
        <div className="max-w-6xl mx-auto mb-3 p-6 bg-gray-200 shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">My Companies</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Logo</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Description</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Website</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Location</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-sm text-gray-700">
                    {companies.map((company, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4">
                                {company.logo ? (
                                    <img src={`http://localhost:5050/upload-file/${company.logo}`} alt="Logo" className="h-12 w-12 rounded-full object-cover"/>
                                ) : (
                                    <span className="text-gray-400">No Logo</span>
                                )}
                            </td>
                            <td className="px-6 py-4">{company.name}</td>
                            <td className="px-6 py-4">{company.description}</td>
                            <td className="px-6 py-4">
                                <a href={company.website} target="_blank" rel="noopener noreferrer"
                                   className="text-indigo-600 hover:underline">
                                    {company.website}
                                </a>
                            </td>
                            <td className="px-6 py-4">{company.location}</td>
                            <td className="px-6 py-4 text-center">
                                <button
                                    onClick={() => onEdit(company._id)}
                                    className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md shadow"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(company._id)}
                                    className="text-white bg-red-600 hover:bg-red-800 px-[8px] py-2 mt-1 rounded-md shadow-md"
                                >
                                   Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    )
        ;
};

export default CompanyDetailsForm;