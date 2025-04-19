import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({

        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String}, // URL to resume file
        resumeOriginalName:{type:String},
        companyId:{type:mongoose.Schema.Types.ObjectId},
        userId:{type:mongoose.Schema.Types.ObjectId},

    },
    {timestamps:true,versionKey:false,}
);
const ProfileModel = mongoose.model('profiles', ProfileSchema);
export default ProfileModel;