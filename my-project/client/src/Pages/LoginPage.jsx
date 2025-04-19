import React from 'react';
import MenuBar from "../Components/MenuBar.jsx";
import LoginForm from "../Components/loginForm.jsx";
import FooterForm from "../Components/footerForm.jsx";
import MasterLayout from "../../MasterLayout/MasterLayout.jsx";

const LoginPage = () => {
    return (
        <div>
            <MasterLayout>
            <LoginForm/>
            </MasterLayout>
        </div>
    );
};

export default LoginPage;