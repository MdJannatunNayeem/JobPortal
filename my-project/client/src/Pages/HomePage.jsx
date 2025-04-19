import React from 'react';
import MenuBar from "../Components/MenuBar.jsx";
import HomeTopInformation from "../Components/HomeTopInformation.jsx";
import JobSearchSection from "../Components/JobSearchSection.jsx";
import AboutSection from "../Components/AboutSection.jsx";
import FooterForm from "../Components/footerForm.jsx";
import MasterLayout from "../../MasterLayout/MasterLayout.jsx";

const HomePage = () => {
    return (
        <div>
        <MasterLayout>
            <HomeTopInformation/>
            <JobSearchSection/>
            <AboutSection/>
            </MasterLayout>
        </div>
    )
};

export default HomePage;