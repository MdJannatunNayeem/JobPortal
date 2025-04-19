
import {DecodeToken} from "../utility/tokenUtility.js";

export default (req,res,next)=>{

    // Receive Token
    let token=req.headers['token']
    if(!token){
        token=req.cookies['token']
    }


    // Token Decode
    let decoded=DecodeToken(token)


    // Request Header Email+UserID Add
    if(decoded===null){
        return res.status(401).json({status:"fail", message:"Unauthorized"})
    }
    else {
        let email=decoded['email'];
        let id=decoded['id'];
        req.headers.email=email;
        req.headers.id=id;
        next();
    }
};