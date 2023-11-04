import jwt from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";
import { NewRegister } from "../types";


export const verifyConnection = (req : Request, res : Response, next : NextFunction)=>{
    //read cookies
    if(req.headers.cookie && req.headers.cookie.length > 0){
        //get the token value
        const token = req.headers.cookie.split("=")[1];
        if(!token){
            return res.status(401).json({
                message : "deny access",
                type : "Error"
            })
        }
        //verify if the token with My_secret_key sign is valid
        jwt.verify(token,"My_secret_key",(error, decoded)=>{
            if(error){
                return res.status(401).json({
                    message : "Token not valid",
                    type : "Error"
                })
            }
            const user = decoded as NewRegister
            req.user = user
            return next()
        })
    }
    else{
        return res.redirect("/api/")
    }
}



