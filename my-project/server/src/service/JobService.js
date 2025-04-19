import {JobsModel} from "../models/JobsModel.js";
import mongoose from "mongoose";
const ObjectID=mongoose.Types.ObjectId;

export const postJobService = async (req) => {
    try {
        const reqBody = req.body;

        reqBody.created_by=req.headers.id;
        const company= req.body.companyId;
        if (company) {
            reqBody.companyId = new mongoose.Types.ObjectId(company);
        }
        console.log("jobsss",reqBody);
        const job = await JobsModel.create(reqBody);
        return {
            message: "New job created successfully.",
            job:job,
            status: true
        }
    } catch (error) {
        console.log(error);
    }
}

export const getAllJobService = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        console.log(keyword);

        const jobs = await JobsModel.aggregate([
            {
                $match: {
                    $or: [
                        { title: { $regex: keyword, $options: "i" } },
                        { description: { $regex: keyword, $options: "i" } },
                    ]
                }
            },
           {$lookup: {from: "companies", localField: "companyId", foreignField: "_id", as: "company" } },
            { $unwind: "$company" },
           { $sort: { createdAt: -1 } }
        ]);

        if (!jobs.length) {
            return {
                message: "Jobs not found.",
                success: false
            }
        }

        return { jobs, success: true }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};


export const getJobByIdService = async (req, res) => {
    try {
        const jobId = req.params.id;

        const jobs = await JobsModel.aggregate([
            {
                $match: { _id: new ObjectID(jobId) }
            },
            {
                $lookup: {from: "applications", localField: "_id", foreignField: "job", as: "applications"}
            }
        ]);

        const job = jobs[0];
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({ message: "Job found By Id.", jobs:job, success: true });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

export const getAdminJobService = async (req, res) => {
    try {
        const adminId = req.headers.id;

        const jobs = await JobsModel.aggregate([
            {
                $match: { created_by: new mongoose.Types.ObjectId(adminId) }
            },
            {
                $lookup: {from: "companies", localField: "companyId", foreignField: "_id", as: "company"}
            },
            { $unwind: "$company" },
            { $sort: { createdAt: -1 } }
        ]);

        if (!jobs.length) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            });
        }

        return res.status(200).json({  message: "Jobs  found.", Jobs:jobs, success: true });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};
