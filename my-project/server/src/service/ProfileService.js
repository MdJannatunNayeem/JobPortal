import ProfileModel from "../models/ProfileModel.js";
import mongoose from "mongoose";


export const getProfileServices = async (req) => {
    try {

        const profile = await ProfileModel.aggregate([
            {
                $match: { userId : new mongoose.Types.ObjectId(req.params.userId) }
            },

           {$lookup: {from: "companies", localField: "companyId", foreignField: "_id", as: "company" } },
            { $unwind: { path: "$company", preserveNullAndEmptyArrays: true } },

            {$lookup: {from: "users", localField: "userId", foreignField: "_id", as: "user" } },
            { $unwind: "$user" },
            {
                $project: {
                    bio: 1,
                    skills: 1,
                    resume: 1,
                    resumeOriginalName: 1,
                    user: {
                        firstname: "$user.firstName",
                        lastname: "$user.lastName",
                        email: "$user.email",
                        img:"$user.img"
                    },
                    company: {
                        _id: "$company._id",
                        name: "$company.name"
                    },
             createdAt: -1 } }
        ]);
        console.log(profile[0]);
        return {success:true,profile:profile};
    } catch (err) {
        return { error: 'Failed to fetch profile' };
    }
}

export const updateProfileServices = async (req,res) => {
    try {
        const { bio, skills, company } = req.body;


        let updatedData = {
            bio,
            skills: skills ? JSON.parse(skills) : [],

        };
        console.log("companyId:",company)
        if (company) {
            updatedData.companyId = new mongoose.Types.ObjectId(company);
        }
        if (req.file) {
            updatedData.resume = `/upload-file/${req.file.filename}`;
            updatedData.resumeOriginalName = req.file.originalname;
        }

        const profile = await ProfileModel.findOneAndUpdate(
            { userId: req.params.userId },
            updatedData,
            { new: true, upsert: true }
        );
          console.log(profile)
        return {status:true,profile:profile,msg:"update sucessfully."};
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Profile update failed', msg:"not update"});
    }
};