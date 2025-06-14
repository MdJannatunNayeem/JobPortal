import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name:{type:String, required:true, unique:true},
    description:{type:String,},
    website:{type:String},
    location:{type:String},
    logo:{type:String },// URL to company logo
    userId:{type:mongoose.Schema.Types.ObjectId, required:true }
},{timestamps:true , versionKey:false,})
export const CompanyModel = mongoose.model("companies", companySchema);