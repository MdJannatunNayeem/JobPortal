import React from 'react';
import MasterLayout from "../../MasterLayout/MasterLayout.jsx";
import CompanyDetailsForm from "../Components/companyDetailsForm.jsx";
import MenuBar from "../Components/MenuBar.jsx";

const CompanyDetailsPage = () => {
    return (
        <div>
            <MenuBar/>
                <CompanyDetailsForm/>

        </div>
    );
};

export default CompanyDetailsPage;