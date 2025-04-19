import React from 'react';
import MenuBar from "../src/components/MenuBar.jsx";
import FooterForm from "../src/components/footerForm.jsx";

const MasterLayout = ({children}) => {
    return (
        <>
            <MenuBar/>
            <div>{children}</div>
            <FooterForm/>
        </>
    );
};

export default MasterLayout;