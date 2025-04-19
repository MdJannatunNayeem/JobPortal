import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
        email:{type:String,unique:true,required:true,lowercase:true},
        password:{type:String,required:true},
        firstName:{type:String},
        lastName:{type:String},
        phone:{type:String},
        img:{type:String},
        role:{type:String},
        otp:{type:Number},
    },
    {timestamps:true,versionKey:false,}
);
const UsersModel = mongoose.model('users', UserSchema);
export default UsersModel;