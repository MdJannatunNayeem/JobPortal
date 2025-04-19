import {CompanyModel} from '../models/CompanyModel.js'

import * as uploaduility from "../utility/uploadUtility.js";

//register company
export const registerCompany = async (req) => {
    try {
        const reqBody = req.body;

        reqBody.userId = req.headers.id;

        let companyName= reqBody.name;
        console.log("back",companyName,reqBody.userId,reqBody);
        let company = await CompanyModel.findOne({ name: companyName });

        if (company) {
            return {
                message: "You can't register same company.",
                success: false
            }
        }
        const data = await CompanyModel.create(reqBody);
            console.log(data);
            return {status:true, data:data,message: "You successfully register a company.",};

    } catch (error) {
        console.log(error);
    }
}

export const getCompany = async (req) => {
    try {
        const userId = req.headers.id; // logged in user id
        console.log("back",userId);
        const companies = await CompanyModel.find({ userId: userId });
        if (!companies) {
            return {
                status: 'error',
                message: "Companies not found.",
                success: false
            }
        }
        console.log(companies);
        return  {status:"success", data:companies };
    } catch (error) {
        console.log(error);
    }
}
// get company by id
export const getCompanyById = async (req) => {
    try {
        const companyId = req.params.id;
        const company = await CompanyModel.findById(companyId);
        if (!company) {
             return {
                status: 'error',
                message: "Companies not found.",
                success: false
            }
        }
        return {
            status: 'success',
            message: "Companies are found.",
            data: company
        }
    } catch (error) {
        console.log(error);
    }
}


export const updateCompanyService = async (req, res) => {
    try {
        console.log(req.body);
        const { name, description, website, location } = req.body ;
        const file = req.file;
        const companyId = req.params.id;



        const company = await CompanyModel.find({_id:companyId});
        if (!company) {
            return{ message: "Company not found.", success: false}
        }

        let logo = company.logo;
        console.log(logo);
        if (file) {
            if (logo) {
                await uploaduility.deleteImage(logo);
            }
            logo = file.filename;
        }


        const updateData = { name, description, website, location, logo };
        await CompanyModel.findByIdAndUpdate(companyId, updateData, { new: true });
        console.log("update",updateData);

        return {
            message: "Company information updated.",
            update: updateData,
            success: true,
            status: 'success'
        }

    } catch (error) {
        console.error("Update error:", error);
        return {
            message: "Something went wrong.",
            success: false
        }
    }
};
