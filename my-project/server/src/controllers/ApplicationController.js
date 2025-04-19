import {
    applyJobService,
    getApplicantService,
    getAppliedJobService,
    updateStatusService
} from "../service/ApplicationService.js";


export const applyJob =async (req, res) => {
    let result = await applyJobService(req, res);
    return res.json(result);
}

export const getAppliedJob =async (req, res) => {
    let result = await getAppliedJobService(req, res);
    return res.json(result);
}

export const getApplicant =async (req, res) => {
    let result = await getApplicantService(req, res);
    return res.json(result);
}

export const updateStatus =async (req, res) => {
    let result = await updateStatusService(req, res);
    return res.json(result);
}