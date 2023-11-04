import jwt from "jsonwebtoken";
import { NewRegister } from "../types";
import { Socket } from "socket.io";


export const getUserCokkie = (socket : Socket):Promise<string> | never=>{
    return new Promise((resolve, _reject) => {
        //check if exist cookies
        if (socket.handshake.headers.cookie) {
            //get cookie value
            const cookie = socket.handshake.headers.cookie;
            const data = cookie.split("=");

            //check if token is valid
            jwt.verify(data[1], "My_secret_key", (error, decoded) => {
                if (error) {
                    throw new Error("Token not valid");
                } else {
                    //return the userName
                    const user = decoded as NewRegister;
                    resolve(user.userName);
                }
            });
        } else {
            throw new Error("Missing error")
        }
    });
}