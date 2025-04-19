import UsersModel from "../models/UsersModel.js";
import {EncodeToken} from "../utility/tokenUtility.js";
import EmailSend from "../utility/emailUtility.js";


export const registerService = async (req) => {
    try {
        const reqBody = req.body;

        const existingUser = await UsersModel.findOne({ email: reqBody.email });
        if (existingUser) {
            return { status: 'error', error: 'User already exists with this email.' };
        }

       const data=await UsersModel.create(reqBody);
        return {status:'success', data:data};
    }catch(e){
        return {status:'error',error:e.toString()};
    }
}

//login-service

export const loginService = async (req,res)=>{
    try{

        let existUser= await UsersModel.findOne({email:req.body.email});
        console.log(existUser)

        if(!existUser){
            return {status:"fail", msg:"User does not exist"};
        }
        else{
            let reqBody={email: req.body.email,password:req.body.password,role:req.body.role};
            //console.log("reqBody:",reqBody);
            let data = await UsersModel.aggregate([
                {$match:reqBody},
                {$project:{ _id: 1,email: 1}},
            ]);
            console.log(data);
            if(data.length === 1){
                let token = EncodeToken(data[0]["email"],data[0]["_id"]);

                let options = {
                    maxAge:30*24*60*60*1000,
                    httpOnly:false,
                    sameSite:null,
                    secure:true,
                };
                res.cookie('token', token, options);
                console.log(token);
                return {status:"success",msg: `${reqBody.role} Login successful.` , token:token,data:data};
            } else {
                return { status: "fail", data: data, msg: "Login unsuccessful." };
            }

        }
    }catch(e){
        return {status:'error',error:e.toString()};
    }
}

//logout
export const logoutService = async (req,res) => {
    try {
        res.clearCookie("token");
        return { status: true, msg: "Logout success." };
    } catch (e) {
        return { status: false, error: e, msg: "Logout failed" };
    }
}

//get otp

export const UserOTPService = async (req) => {
    try {
        let email=req.params.email;
        let code=Math.floor(100000+Math.random()*900000);
        console.log(email,code);

        let EmailText=`Your Verification Code is= ${code}`
        let EmailSubject='Email Verification'

        await EmailSend(email,EmailText,EmailSubject);

        await UsersModel.updateOne({email:email},{$set:{otp:code}},{upsert:true})

        return {status:"success", message:"6 Digit OTP has been send"}
    }catch (e) {
        return {status:"fail", message:e}
    }
}

//verify and change password
export const VerifyOTPService = async (req) => {

    try {
        let email=req.params.email;
        let otp=req.params.otp;

        // User Count
        let total=await UsersModel.find({email:email,otp:otp}).countDocuments();


        if(total===1){

            // User ID Read
            let user_id=await UsersModel.find({email:email,otp:otp}).select('_id');

            // User Token Create
            let token=EncodeToken(email,user_id[0]['_id'].toString())

            // OTP Code Update To 0
            await UsersModel.updateOne({email:email},{$set:{otp:"0"}})

            return {status:"success", message:"Valid OTP",token:token,total:total}

        }
        else{
            return {status:"fail", message:"Invalid OTP",total:total}
        }

    }catch (e) {
        return {status:"fail", message:"Invalid OTP"}
    }


}

// update password
export const ChangePasswordService = async (req) => {
    try {
        let email =req.headers.email;
        let Password=req.body.password;
      //  reqBody.userID=user_id;
        await UsersModel.updateOne({email:email},{$set:{password:Password}},{upsert:true})
        return {status:"success", message:"Password Changed Success",password:Password,email:email}
    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}

//user-details

export const UserDetailsService = async (req)=>{
    try{

        let existUser= await UsersModel.findOne({_id:req.headers.id});
       // console.log("from user details ",existUser);

        if(!existUser){
            return {status:false, msg:"User does not exist"};
        }
        else{
                return {status:true, data:existUser};
        }
    }catch(e){
        return {status:'error',error:e.toString()};
    }
}

