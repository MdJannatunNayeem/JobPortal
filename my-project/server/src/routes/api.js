import express from "express";
import * as UserController from "../controllers/UserController.js";
import upload from "../middlewares/FileUploads.js";
import * as FileUploadController from "../controllers/FileUploadController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";
import * as CompanyController from "../controllers/CompanyController.js"
import * as JobController from "../controllers/JobController.js"
import * as ApplicationController from "../controllers/ApplicationController.js"
import {getApplicant} from "../controllers/ApplicationController.js";
import * as ProfileController from "../controllers/ProfileController.js";
import * as profileController from "../controllers/ProfileController.js";

const router = express.Router();

//users
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/logout", UserController.logout);
router.get("/OTP/:email",UserController.useOTP);
router.get('/VerifyLogin/:email/:otp',UserController.verifyOTP);
router.get('/user-details',authMiddleware.default, UserController.UserDetails);
router.post("/changed-password", authMiddleware.default , UserController.changePassword);

//For Company Routing
router.post("/company-register", authMiddleware.default,CompanyController.companyRegister);
router.get("/company-recuiter",authMiddleware.default,CompanyController.getCompanyByUser);
router.get("/get-company/:id",authMiddleware.default,CompanyController.getCompanyByCompany);
router.put("/update-company/:id",authMiddleware.default,upload.single("file"),CompanyController.updateCompany);
router.delete("/delete-company/:id",CompanyController.deleteCompany);


//for Job
router.post("/post-job",authMiddleware.default,JobController.postAJob);
router.get("/get-all-job",authMiddleware.default,JobController.getAlljob);
router.get("/job-details/:id",authMiddleware.default,JobController.getJobById);
router.get("/get-admin-job",authMiddleware.default,JobController.getAdminJob);
router.get("/jobs",JobController.FindAllJobs);
router.get("/total",JobController.getJobSummaryStats);

//for applications
router.get("/apply/:id",authMiddleware.default,ApplicationController.applyJob);
router.get("/applied-job",authMiddleware.default,ApplicationController.getAppliedJob);
router.get("/applicants",authMiddleware.default,ApplicationController.getApplicant);
router.post("/status/:id/update",authMiddleware.default,ApplicationController.updateStatus);


//profile
router.get('/:userId', ProfileController.getProfile);
router.put('/:userId/update', upload.single('file'), ProfileController.updateProfile);

// file-route
router.post("/file-upload", upload.single("file"), FileUploadController.fileUpload);

export default router;