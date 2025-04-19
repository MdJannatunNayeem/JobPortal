import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    requirements: [{type: String}],
    salary: {type: Number, required: true},
    experienceLevel:{type:Number, required:true,},
    location: {type: String, required: true},
    jobType: {type: String, required: true},
    position: {type: Number, required: true},
    companyId:{type: mongoose.Schema.Types.ObjectId,  required: true},
    created_by: {type: mongoose.Schema.Types.ObjectId, required: true},
    applications: [{type: mongoose.Schema.Types.ObjectId}]

},{timestamps:true,versionKey:false,});
export const JobsModel = mongoose.model("jobs", jobSchema);