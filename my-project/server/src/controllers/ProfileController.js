import {getProfileServices, updateProfileServices} from "../service/ProfileService.js";


export const getProfile = async (req,res) => {
    let result = await getProfileServices(req);
    return res.json(result);
}

export const updateProfile = async (req,res) => {
    let result = await updateProfileServices(req,res);
    return res.json(result);
}