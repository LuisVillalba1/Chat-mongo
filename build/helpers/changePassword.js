"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = void 0;
const connectionDb_1 = require("../db/connectionDb");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hash_1 = require("./hash");
//change the current account password
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //firstly get db and collection
        const db = connectionDb_1.client.db("chat");
        const collection = db.collection("users");
        //get the token which has account email
        const { token } = req.params;
        //verify token and get the account data
        const decodedToken = yield new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(token, "My_secret_key", (error, decoded) => {
                if (error) {
                    reject("Token not valid");
                }
                else {
                    resolve(decoded);
                }
            });
        });
        const user = decodedToken;
        //verify if the user entered a password and repeatPassword
        if ("password" in req.body && "repeatPassword" in req.body) {
            //verify that the password matches the repeated one
            if (req.body.password == req.body.repeatPassword) {
                //search the account anda change de password
                yield collection.updateOne({ email: user.email }, {
                    $set: {
                        //generate hash to the password
                        password: yield (0, hash_1.generateHash)(req.body.password),
                        loginAttempts: 0,
                        lockedUntil: null,
                        isLocked: false
                    }
                });
                return res.json({
                    message: "Password changed successfully"
                });
            }
            throw new Error("Password and repeat Password are not the same");
        }
        throw new Error("Please enter a password and repeat Password");
    }
    catch (e) {
        if (e instanceof Error) {
            return res.json({
                message: e.message,
                type: e.name
            });
        }
        return res.json({
            message: "Missing error",
            type: "Error"
        });
    }
});
exports.changePassword = changePassword;
