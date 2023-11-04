import jwt from "jsonwebtoken";
import { RecuperateAccount} from "../types";

//generate a token for recuperate a account
export const generateToken = async(user : RecuperateAccount):Promise<string> | never=>{
    try{
        const secretKey = "My_secret_key";
        //create a new token;
        //token expires one hour after it is generated
        const token = jwt.sign(user,secretKey,{expiresIn : "1h"});
        return token
    }
    catch(e){
        if(e instanceof Error){
            throw new Error(e.message)
        }
        throw new Error("Missing error")
    }
}


