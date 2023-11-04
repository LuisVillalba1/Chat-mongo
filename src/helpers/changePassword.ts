import { Request,Response } from "express";
import { client } from "../db/connectionDb";
import jwt from "jsonwebtoken"
import { generateHash } from "./hash";
import { RecuperateAccount, ErrorType } from "../types";

//change the current account password
export const changePassword= async(req : Request,res : Response):Promise<object | ErrorType>=>{
    try{
        //firstly get db and collection
        const db = client.db("chat");
        const collection = db.collection("users")

        //get the token which has account email
        const {token} = req.params;

        //verify token and get the account data
        const decodedToken = await new Promise((resolve, reject) => {
            jwt.verify(token, "My_secret_key", (error, decoded) => {
                if (error) {
                    reject("Token not valid");
                } else {
                    resolve(decoded);
                }
            });
        });
        const user = decodedToken as RecuperateAccount;
        //verify if the user entered a password and repeatPassword
        if ("password" in req.body && "repeatPassword" in req.body) {
            //verify that the password matches the repeated one
            if(req.body.password == req.body.repeatPassword){
                //search the account anda change de password
                await collection.updateOne(
                    { email : user.email},
                    {
                        $set: {
                            //generate hash to the password
                            password: await generateHash(req.body.password),
                            loginAttempts: 0,
                            lockedUntil: null,
                            isLocked: false
                        }
                    }
                );
                return res.json({
                    message: "Password changed successfully"
                });
            }
            throw new Error("Password and repeat Password are not the same")
        }
        throw new Error("Please enter a password and repeat Password")
    }
    catch(e){
        if(e instanceof Error){
            return res.json({
                message : e.message,
                type : e.name
            })
        }
        return res.json({
            message : "Missing error",
            type : "Error"
        })
    }
}