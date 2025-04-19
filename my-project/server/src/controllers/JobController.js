import {getAdminJobService, getAllJobService, getJobByIdService, postJobService} from "../service/JobService.js";
import {JobsModel} from "../models/JobsModel.js";


export const postAJob=async (req, res) => {
    let result = await postJobService(req);
    return res.json(result);
}

export const getAlljob =async (req, res) => {
    let result = await getAllJobService(req,res);
    return res.json(result);
}

export const getJobById=async (req, res) => {
    let result = await getJobByIdService(req,res);
    return res.json(result);
}

export const FindAllJobs = async (req, res) => {
    try {
        const jobs = await JobsModel.aggregate([
            {
                $lookup: {
                    from: "companies", // collection name in MongoDB
                    localField: "companyId",
                    foreignField: "_id",
                    as: "company"
                }
            },
            { $unwind: "$company" },
            {
                $project: {
                    title: 1,
                    description: 1,
                    requirements: 1,
                    salary: 1,
                    experienceLevel: 1,
                    location: 1,
                    jobType: 1,
                    position: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    company: {
                        _id: "$company._id",
                        name: "$company.name",
                        logo: "$company.logo"
                    }
                }
            },
            { $sort: { createdAt: -1 } }
        ]);

        res.status(200).json({ status: true, jobs });
    } catch (error) {
        console.error("Error fetching jobs:", error.message);
        res.status(500).json({ status: false, message: "Error fetching jobs" });
    }
};




export const getAdminJob=async (req, res) => {
    let result = await getAdminJobService(req,res);
    return res.json(result);
}

export const getJobSummaryStats = async (req, res) => {
    try {
        const stats = await JobsModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalJobPosts: { $sum: 1 },
                    totalJobPositions: { $sum: "$position" },
                    companies: { $addToSet: "$companyId" }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalJobPosts: 1,
                    totalJobPositions: 1,
                    totalCompanies: { $size: "$companies" }
                }
            }
        ]);

        const result = stats[0] || {
            totalJobPosts: 0,
            totalJobPositions: 0,
            totalCompanies: 0
        };

        return res.status(200).json({
            success: true,
            stats: result
        });

    } catch (error) {
        console.error("Error in getJobSummaryStats:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch job statistics"
        });
    }
};
