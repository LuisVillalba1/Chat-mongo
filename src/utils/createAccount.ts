import { client } from "../db/connectionDb";
import { generateHash } from "../helpers/hash";
import { ErrorType, NewRegister, Register } from "../types";
import { Response} from "express";

//cheking if the email and userName received are already registered in the db
export const searchUserAndEmail = async (email: string, userName: string): Promise<boolean>| never => {
    //get db and collection
    const dataBase = client.db("chat");
    const collection = dataBase.collection("users");

    const querryEmail = { email: email };
    const querryName = { userName: userName };

    //verify if email and userName is already registered
    const dataEmail = await collection.findOne(querryEmail);
    const dataUserName = await collection.findOne(querryName);

    if (dataEmail) {
        throw new Error("The email address is already registered")
    }

    if (dataUserName) {
        throw new Error("The user name is already resgistered")
    }

    return true;
}
// Create a new account
export const createAccount = async (account: Register, res: Response): Promise<object | ErrorType> => {
    try {
        //create a new account which has NewRegister properties
        const newAccount : NewRegister = {
            name : account.name,
            lastName : account.lastName,
            userName : account.userName,
            email : account.email,
            country : account.country,
            city : account.city,
            password : await generateHash(account.password),
            loginAttempts : 1,
            isLocked : false,
            lockedUntil : null

        }
        //verify if the email and username exists
        await searchUserAndEmail(newAccount.email, newAccount.userName);

        //insert the new user in the db
        const dataBase = client.db("chat");
        const collection = dataBase.collection("users");
        await collection.insertOne(newAccount);

        return res.json({
            message: true
        });

    } catch (e) {
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
