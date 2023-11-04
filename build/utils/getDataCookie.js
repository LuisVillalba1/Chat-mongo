"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserCokkie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUserCokkie = (socket) => {
    return new Promise((resolve, _reject) => {
        //check if exist cookies
        if (socket.handshake.headers.cookie) {
            //get cookie value
            const cookie = socket.handshake.headers.cookie;
            const data = cookie.split("=");
            //check if token is valid
            jsonwebtoken_1.default.verify(data[1], "My_secret_key", (error, decoded) => {
                if (error) {
                    throw new Error("Token not valid");
                }
                else {
                    //return the userName
                    const user = decoded;
                    resolve(user.userName);
                }
            });
        }
        else {
            throw new Error("Missing error");
        }
    });
};
exports.getUserCokkie = getUserCokkie;
