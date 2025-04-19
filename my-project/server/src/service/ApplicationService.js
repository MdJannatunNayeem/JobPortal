import {ApplicationModel} from "../models/ApplicationsModel.js";
import {JobsModel} from "../models/JobsModel.js";
import mongoose from "mongoose";


export const applyJobService = async (req, res) => {
    try {
        const userId = req.headers.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        }
        const existingApplication = await ApplicationModel.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }


        const job = await JobsModel.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        // create new application
        const newApplication = await ApplicationModel.create({
            job:jobId,
            applicant:userId,
        });

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(200).json({
            message:"Job applied successfully.",
            success:true,
            newApplication:newApplication
        })
    } catch (error) {
        console.log(error);
    }
};
export const getAppliedJobService = async (req,res) => {
    try {
        const userId = req.headers.id;
        const applications = await ApplicationModel.aggregate([
            {
                $match: {
                    applicant: new mongoose.Types.ObjectId(userId)
                }
            },
            { $lookup: {from: 'jobs', localField: 'job', foreignField: '_id', as: 'job'} },
            { $unwind: '$job' },
            { $lookup: {from: 'companies', localField: 'job.companyId', foreignField: '_id', as: 'job.company'}},
            { $unwind: '$job.company' },

            {
                $sort: { createdAt: -1 }
            }
        ]);

        if(!applications){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            applications:applications,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// admin
export const getApplicantService = async (req,res) => {
    try {
        const userId = req.headers.id;
        const job = await JobsModel.aggregate([
            {
                $match: {
                    created_by: new mongoose.Types.ObjectId(userId)
                }
            },
            { $lookup: {from: 'companies', localField: 'companyId', foreignField: '_id', as: 'company'} },
            { $unwind: '$company' },

            { $lookup: {from: 'applications', localField: 'applications', foreignField: '_id', as: 'applicant'} },
            { $unwind: '$applicant' },
            { $lookup: {from: 'users', localField: 'applicant.applicant', foreignField: '_id', as: 'user'} },
            { $unwind: '$user' },
            { $lookup: {from: 'profiles', localField: 'user._id', foreignField: 'userId', as: 'profile'} },
            { $unwind: { path: '$profile', preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    company: { name: "$company.name" },
                    applicant: {
                        _id: "$applicant._id",
                        createdAt: "$applicant.createdAt",
                        status: "$applicant.status"
                    },
                    user: {
                        _id: "$user._id",
                        firstName: "$user.firstName",
                        lastName: "$user.lastName",
                        img: "$user.img"
                    },
                    profile: {
                        resume: "$profile.resume"
                    }
                }
            }



        ]);
        if(!job){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        }
        return res.status(200).json({
            Job:job,
            success:true
        });
    } catch (error) {
        console.log(error);
    }
}
export const updateStatusService = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        }

        // find the application by applicantion id
        const application = await ApplicationModel.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            })
        }

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true,
            application:application
        });

    } catch (error) {
        console.log(error);
    }
}

