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
exports.checkAccount = exports.checkExistEmail = void 0;
const connectionDb_1 = require("../db/connectionDb");
const utils_1 = require("./utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//checking if the email is on our db
const checkExistEmail = (object) => __awaiter(void 0, void 0, void 0, function* () {
    //connect to our db an get collection
    const dataBase = connectionDb_1.client.db("chat");
    const collection = dataBase.collection("users");
    //check if the object has de email propertie
    if ("email" in object) {
        if ((0, utils_1.isString)(object.email)) {
            //create a new querry
            const querry = { email: object.email };
            const data = yield collection.findOne(querry);
            //if not exist any account with that email
            if (!data) {
                throw new Error("The email do not exist");
            }
            return data;
        }
        throw new Error("Invalid email format");
    }
    throw new Error("please enter a email");
});
exports.checkExistEmail = checkExistEmail;
//check the account email and password
const checkAccount = (object, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //check email account
        const user = yield (0, exports.checkExistEmail)(object);
        //check if the object has password propertie
        if ("password" in object) {
            //if the account password and the ingresed password are the same
            if (user.password == object.password) {
                //token sign
                const secretKey = "My_secret_key";
                //create a new token
                const token = jsonwebtoken_1.default.sign(user, secretKey);
                //send token to cookies from navigator
                res.cookie("jwt", token, { httpOnly: true });
                return res.status(303).json({
                    location: "/api/myAccount"
                });
            }
            throw new Error("invalid password");
        }
        throw new Error("please enter a password");
    }
    catch (e) {
        if (e instanceof Error) {
            return res.json({
                message: e.message,
                type: e.name
            });
        }
        return res.status(502).json({
            message: "Missing error"
        });
    }
});
exports.checkAccount = checkAccount;
