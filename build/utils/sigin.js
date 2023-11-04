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
exports.checkAccount = exports.chekBlockAccount = exports.checkExistData = void 0;
const connectionDb_1 = require("../db/connectionDb");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hash_1 = require("../helpers/hash");
//checking if the email is on our db
const checkExistData = (object) => __awaiter(void 0, void 0, void 0, function* () {
    //connect to our db an get collection
    const dataBase = connectionDb_1.client.db("chat");
    const collection = dataBase.collection("users");
    //check if the object has de email propertie
    if ("email" in object && "password" in object) {
        //create a new querry
        const querry = { email: object.email };
        const data = yield collection.findOne(querry);
        //if not exist any account with that email
        if (!data) {
            throw new Error("The email do not exist");
        }
        //return all data
        const mappedData = {
            name: data.name,
            lastName: data.lastName,
            userName: data.userName,
            email: data.email,
            country: data.country,
            city: data.city,
            password: data.password,
            loginAttempts: data.loginAttempts,
            isLocked: data.isLocked,
            lockedUntil: data.lockedUntil,
        };
        return (0, exports.chekBlockAccount)(mappedData, object, dataBase);
    }
    throw new Error("Invalid format");
});
exports.checkExistData = checkExistData;
const chekBlockAccount = (user, object, db) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = db.collection("users");
    //verify if the account is locked and the lockedUntil value is lower than the current time
    if (user.isLocked && user.lockedUntil != null && user.lockedUntil > new Date()) {
        throw new Error(`The account is blocked until ${user.lockedUntil}`);
    }
    //if the password entered is correct, modify loggin attempts,lockedUntil and locked
    if (yield (0, hash_1.compareHash)(object.password, user.password)) {
        yield collection.updateOne({ userName: user.userName }, { $set: { loginAttempts: 0, lockedUntil: null, isLocked: false } });
        return user;
    }
    //if the user tried login throw a error and increase loginAttempts
    if (user.loginAttempts < 5) {
        yield collection.updateOne({ userName: user.userName }, { $set: { loginAttempts: user.loginAttempts + 1 } });
        throw new Error("Mail or password not valid");
    }
    //if user loginAttempts is greater than 5,blocked the account for 8 minutes
    const eightMinutesLater = new Date(Date.now() + (1000 * 60 * 8));
    yield collection.updateOne({ userName: user.userName }, { $set: { lockedUntil: eightMinutesLater, isLocked: true, loginAttempts: 0 } });
    throw new Error(`The account in blocked until ${eightMinutesLater}`);
});
exports.chekBlockAccount = chekBlockAccount;
//check the account email and password
const checkAccount = (object, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //check email account
        const user = yield (0, exports.checkExistData)(object);
        //token sign
        const secretKey = "My_secret_key";
        //create a new token
        const token = jsonwebtoken_1.default.sign(user, secretKey);
        //send token to cookies from navigator;
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: true,
            //30 days
            expires: new Date(Date.now() + (30 * 24 * 60 * 60 * 1000))
        });
        return res.status(303).json({
            location: "/api/myAccount",
            user: user.userName
        });
    }
    catch (e) {
        if (e instanceof Error) {
            return res.json({
                message: e.message,
                type: e.name
            });
        }
        return res.status(502).json({
            message: "Missing error",
            type: "Error"
        });
    }
});
exports.checkAccount = checkAccount;
