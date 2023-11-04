import { Db } from "mongodb";
import { client } from "../db/connectionDb";
import { ErrorType, NewRegister, Sigin } from "../types";
import { Response } from "express";

import jwt from "jsonwebtoken";
import { compareHash } from "../helpers/hash";

//checking if the email is on our db
export const checkExistData =async (object : Sigin | object):Promise<NewRegister>| never => {
    //connect to our db an get collection
    const dataBase = client.db("chat");
    const collection = dataBase.collection("users");
    //check if the object has de email propertie
    if("email" in object && "password" in object){
            //create a new querry
            const querry = {email : object.email};

            const data = await collection.findOne(querry);

            //if not exist any account with that email
            if(!data){
                throw new Error("The email do not exist")
            }
            //return all data
            const mappedData: NewRegister = {
                name: data.name,
                lastName: data.lastName,
                userName : data.userName,
                email: data.email,
                country: data.country,
                city: data.city,
                password: data.password,
                loginAttempts: data.loginAttempts,
                isLocked: data.isLocked,
                lockedUntil: data.lockedUntil,
            };
            return chekBlockAccount(mappedData,object,dataBase)
    }
    throw new Error("Invalid format")
}

export const chekBlockAccount = async(user : NewRegister,object : Sigin,db : Db):Promise<NewRegister> | never=>{
    const collection = db.collection("users");
    //verify if the account is locked and the lockedUntil value is lower than the current time
    if(user.isLocked && user.lockedUntil != null && user.lockedUntil > new Date()){
        throw new Error(`The account is blocked until ${user.lockedUntil}`)
    }
    //if the password entered is correct, modify loggin attempts,lockedUntil and locked
    if(await compareHash(object.password,user.password)){
        await collection.updateOne({userName : user.userName},{$set : {loginAttempts : 0,lockedUntil : null,isLocked : false}})
        return user
    }
    //if the user tried login throw a error and increase loginAttempts
    if(user.loginAttempts < 5){
        await collection.updateOne({userName : user.userName},{$set : {loginAttempts : user.loginAttempts + 1}})
        throw new Error("Mail or password not valid")
    }
    //if user loginAttempts is greater than 5,blocked the account for 8 minutes
    const eightMinutesLater = new Date(Date.now() + (1000 * 60 * 8))
    await collection.updateOne({userName : user.userName},{$set : {lockedUntil : eightMinutesLater,isLocked : true,loginAttempts : 0}})
    throw new Error(`The account in blocked until ${eightMinutesLater}`);
}

//check the account email and password
export const checkAccount = async(object : Sigin | object,res : Response):Promise<object | ErrorType>=>{
    try{
        //check email account
        const user = await checkExistData(object);
        //token sign
        const secretKey = "My_secret_key";
        //create a new token
        const token = jwt.sign(user,secretKey);
        //send token to cookies from navigator;
        res.cookie("jwt",token,{
            httpOnly : true,
            secure : true,
            //30 days
            expires : new Date(Date.now() + (30 * 24 * 60 * 60 * 1000))
            });
        return res.status(303).json({
            location : "/api/myAccount",
            user : user.userName
            });
    }
    catch(e){
        if(e instanceof Error){
            return res.json({
                message : e.message,
                type : e.name
            })
        }
      return res.status(502).json({
        message : "Missing error",
        type : "Error"
      })
    }
} 