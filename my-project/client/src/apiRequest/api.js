import axios from "axios";
import {DeleteAlert, ErrorToast, SuccessToast} from "../Helper/helper.js";
import Cookies from "js-cookie";

let baseURL= "http://localhost:5050/api/";

class APIRequest {

    async register(reqBody){

        let result= await axios.post(`${baseURL}register`,reqBody);
        return true;
    }

    async login(reqBody) {
        console.log("reqBody:",reqBody);
        let result = await axios.post(`${baseURL}login`, reqBody,{
            withCredentials: true,
        });
        console.log(result);
        if (result.data.status === "success") {
            SuccessToast(result.data.msg);
            return true;
        } else {
            ErrorToast(result.data.msg);
            return false;
        }
    }

    async logout() {
        let result = await axios.get(`${baseURL}logout`, {
            withCredentials: true,
        });
        if (result.data.status === true) {
            SuccessToast(result.data.msg);
            return true;
        } else {
            ErrorToast(result.data.msg);
            return false;
        }
    }


    async createProduct(reqBody) {
        let result = await axios.post(`${baseURL}/create-product`, reqBody, {
            withCredentials: true,
        });
        if (result.data.status === true) {
            SuccessToast(result.data.msg);
            return true;
        } else {
            ErrorToast(result.data.msg);
            return false;
        }
    }
    async getAllProduct() {
        let result = await axios.get(`${baseURL}all-product`, {
            withCredentials: true,
        });
        if (result.data.status === true) {
            return result?.data?.data;
        } else {
            ErrorToast(result.data.msg);
            return false;
        }
    }
    async deleteProduct(id) {
        let isConfirmed = await DeleteAlert();

        console.log(isConfirmed);

        if (isConfirmed) {
            let result = await axios.delete(`${baseURL}/delete-product/` + id, {
                withCredentials: true,
            });
            if (result.data.status === true) {
                SuccessToast(result.data.msg);
                return true;
            } else {
                ErrorToast(result.data.msg);
                return false;
            }
        }
    }

    async fileUpload (reqBody) {

        let result = await axios.post(`${baseURL}file-upload`, reqBody);
        if (result.data.status === true) {
            SuccessToast(result.data.msg);
            console.log(result.data.file);
            return result;
        } else {
            ErrorToast(result.data.msg);
            return false;
        }
    }

    async userDetails() {
        //const  token = Cookies.get("token");
       // console.log(token);

        try{
        let result = await axios.get(`${baseURL}user-details`,{
            withCredentials: true});
        console.log(result);
        if (result.data.status === true) {
            return result.data;
        } else {
            return false;
        }
    }catch (error){
            console.log(error)
        }
    }

    async getProfile(userId) {

        try{
            let result = await axios.get(`${baseURL}${userId}`);
           // console.log("result",result);
            if (result.data.success === true) {
                console.log("result passing",result.data);
                return result.data;
            } else {
                return false;
            }
        }catch (error){
            console.log(error)
        }
    }

    async  companyRegister(reqBody) {
        console.log("api",reqBody);
        let result = await axios.post(`${baseURL}company-register`, reqBody, {
            withCredentials: true
        });
        return true;
    }

    async  getCompanyByUser() {

        let result = await axios.get(`${baseURL}company-recuiter`, {
            withCredentials: true
        });
        //console.log("api",result.data)
        if(result.data.status === "success") {
            console.log(result.data)
        return result.data;}
        else {
            return {error:result.data.msg};
        }
    }

    async getCompanyById(id) {

        let result = await axios.get(`${baseURL}get-company/${id}`,{
            withCredentials: true
        });
        //console.log("api",result.data)
        if(result.data.status === "success") {
            console.log(result.data)
            return result.data;}
        else {
            return {error:result.data.msg};
        }
    }

    async deleteCompany(id) {

        let result = await axios.delete(`${baseURL}delete-company/${id}`,{
            withCredentials: true
        });
        //console.log("api",result.data)
        if(result.data.status === true) {
            //console.log(result.data)
            return result.data;}
        else {
            return {error:result.data.msg};
        }
    }

    async updateCompany(id,reqBody) {

        let result = await axios.put(`${baseURL}update-company/${id}`,reqBody,{
            withCredentials: true
        });
        console.log("api",result.data)
        if(result.data.status === "success") {
            console.log(result.data)
            return result.data;
        }
        else {
            return {error:result.data.msg};
        }
    }

    async updateProfile(id,reqBody) {

        let result = await axios.put(`${baseURL}${id}/update`,reqBody,);
        console.log("api",result.data)
        if(result.data.status === true ){
            console.log(result.data)
            return result.data;
        }
        else {
            return {error:result.data.msg};
        }
    }

    async postAJob(reqBody) {

        let result = await axios.post(`${baseURL}post-job`,reqBody,{
            withCredentials: true
        });
        console.log("api",result.data)
        if(result.data.status === true ){
            console.log(result.data)
            return result.data;
        }
        else {
            return {error:result.data.msg};
        }
    }

    async FindAllJobs(){
        let result = await axios.get(`${baseURL}jobs`,)

        console.log("api",result.data)
        if(result.data.status === true ){
            console.log(result.data)
            return result.data;
        }
        else {
            return {error:result.data.msg};
        }
    }
    async getJobById(id){
        let result = await axios.get(`${baseURL}job-details/${id}`,{
            withCredentials : true
        })
        if(result.data.success === true) {
            return result.data;
        }
        else {
            return {error:result.data.message};
        }
    }
    async applyToJob(id){

        let result = await axios.get(`${baseURL}apply/${id}`,{
            withCredentials: true});
         console.log("api",result.data);
        if(result.data.success === true ){
            return result.data;
        }
    }

    async getAppliedJobs(){
        let result = await axios.get(`${baseURL}applied-job`,{
            withCredentials: true
        })
        if(result.data.success === true){
            return result.data;
        }
        else {
            return {error:result.data.message};
        }
    }

    async getApplicants(){
        let result = await axios.get(`${baseURL}applicants`,{
            withCredentials: true
        })
        if(result.data.success === true){
            return result.data;
        }
        else {
            return {error:result.data.message};
        }
    }

    async updateApplicationStatus(id,reqBody){
        let result = await axios.post(`${baseURL}status/${id}/update`,reqBody,{
            withCredentials: true
        })
        if(result.data.success === true){
            return result.data;
        }
        else {
            return {error:result.data.message};
        }
    }

    async getJobSummaryStats(){
        let result = await axios.get(`${baseURL}total`)
        if(result.data.success === true){
            console.log(result.data)
            return result.data;
        }
        else {
            return {error:result.data.message};
        }
    }


}

export const {register,login,logout,createProduct,getAllProduct,deleteProduct,fileUpload,
userDetails,getProfile,companyRegister,getCompanyByUser,getCompanyById,updateCompany,deleteCompany,updateProfile,postAJob,
    getJobById,FindAllJobs,applyToJob,getAppliedJobs,getApplicants,updateApplicationStatus,getJobSummaryStats} = new APIRequest();