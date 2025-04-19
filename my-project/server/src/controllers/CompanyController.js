import {getCompany, getCompanyById, registerCompany, updateCompanyService} from "../service/CompanyService.js";
import {CompanyModel} from "../models/CompanyModel.js";


export const companyRegister = async (req, res) => {
    let result = await registerCompany(req);
    return res.json(result);
}

export const getCompanyByUser = async (req, res) => {
    let result = await getCompany(req);
    return res.json(result);
}

export const getCompanyByCompany = async (req, res) => {
    let result = await getCompanyById(req);
    return res.json(result);
}

export const updateCompany = async (req, res) => {
    let result = await updateCompanyService(req,res);
    return res.json(result);
}

export const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;
        await CompanyModel.findByIdAndDelete(id);
        return res.json({ status:true, message: "Company deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete company" });
    }
};