import * as UserService from "../service/UserService.js";
import {UserDetailsService} from "../service/UserService.js";

//user registration
export const register=async(req,res)=>{
    let result =await  UserService.registerService(req);
    return res.json(result);
}

//login
export const login=async(req,res)=>{
    let result =await  UserService.loginService(req,res);
    return res.json(result);
}

//logout

export const logout=async(req,res)=>{
    let result=await  UserService.logoutService(req,res);
    return res.json(result);
}
//otp

export const useOTP=async(req,res)=>{
    let result =await UserService.UserOTPService(req);
    return res.json(result);
}

export const verifyOTP=async(req,res)=>{
    let result= await UserService.VerifyOTPService(req);
    return res.json(result);
}

export const changePassword=async(req,res)=>{
    let result= await UserService.ChangePasswordService(req);
    return res.json(result);
}

export const UserDetails = async(req,res)=>{
    let result= await UserService.UserDetailsService(req);
    return res.json(result);
}