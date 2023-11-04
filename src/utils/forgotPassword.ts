import {Response } from "express";
import { client } from "../db/connectionDb";
import {ErrorType, RecuperateAccount } from "../types";
import { generateToken } from "../helpers/tokens";
import { sendEmail } from "../helpers/mailer";

//get the account data and send a email to recuperate the account
export const getAccountData = async(object : object | RecuperateAccount,res : Response):Promise<object | ErrorType>=>{
    try{
        const db = client.db("chat");
        const collection = db.collection("users");

        if("email" in object){
            //find the account
            const querry = {email : object.email}
            const user = await collection.findOne(querry);
            if(user){
                const userFound : RecuperateAccount = {
                    email : user.email
                }
                const token = await generateToken(userFound);
                await sendEmail(userFound.email,token)
                return res.json({
                    message : "Check you mail account"
                })
            }
            throw new Error("Email not found in our db")
        }
        throw new Error("Please enter a email")
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