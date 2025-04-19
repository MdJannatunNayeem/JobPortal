import React from 'react';
import MenuBar from "../Components/MenuBar.jsx";
import RegisterForm from "../Components/RegisterForm.jsx";
import FooterForm from "../Components/footerForm.jsx";
import MasterLayout from "../../MasterLayout/MasterLayout.jsx";

const RegisterPage = () => {
    return (
        <div>
            <MasterLayout>
            <RegisterForm/>
            </MasterLayout>
        </div>
    );
};

export default RegisterPage;