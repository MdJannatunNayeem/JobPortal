import {JWT_EXPIRATION_TIME, JWT_SECRET} from "../config/config.js";
import jwt from "jsonwebtoken";

export const EncodeToken = (email,id) => {
    const KEY = JWT_SECRET;
    const EXPIRE = { expiresIn: JWT_EXPIRATION_TIME };
    const PAYLOAD = { email: email,id:id};
    return jwt.sign(PAYLOAD,KEY,EXPIRE)
}

export const DecodeToken = (token) => {
    try {
        return jwt.verify(token,JWT_SECRET)
    }catch (e) {
        return null;
    }
}