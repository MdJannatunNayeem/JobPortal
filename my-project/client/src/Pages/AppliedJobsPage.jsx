import React from 'react';
import MasterLayout from "../../MasterLayout/MasterLayout.jsx";
import AppliedJobs from "../Components/AppliedJobs.jsx";
import MenuBar from "../Components/MenuBar.jsx";

const AppliedJobsPage = () => {
    return (
        <div>
            <MenuBar/>
                <AppliedJobs/>

        </div>
    );
};

export default AppliedJobsPage;