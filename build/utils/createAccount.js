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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccount = exports.searchUserAndEmail = void 0;
const connectionDb_1 = require("../db/connectionDb");
//cheking if the email and userName received are already registered in the db
const searchUserAndEmail = (email, userName) => __awaiter(void 0, void 0, void 0, function* () {
    //get db and collection
    const dataBase = connectionDb_1.client.db("chat");
    const collection = dataBase.collection("users");
    const querryEmail = { email: email };
    const querryName = { userName: userName };
    //verify if email and userName is already registered
    const dataEmail = yield collection.findOne(querryEmail);
    const dataUserName = yield collection.findOne(querryName);
    if (dataEmail) {
        throw new Error("The email address is already registered");
    }
    if (dataUserName) {
        throw new Error("The user name is already resgistered");
    }
    return true;
});
exports.searchUserAndEmail = searchUserAndEmail;
// Create a new account
const createAccount = (account, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //create a new account which has NewRegister properties
        const newAccount = {};
        //exlude the property passwordRepeat from account in newAccount
        for (const key in account) {
            if (key != "passwordRepeat") {
                newAccount[key] = account[key];
            }
        }
        //verify if the email and username exists
        yield (0, exports.searchUserAndEmail)(newAccount.email, newAccount.userName);
        //insert the new user in the db
        const dataBase = connectionDb_1.client.db("chat");
        const collection = dataBase.collection("users");
        yield collection.insertOne(newAccount);
        return res.json({
            message: true
        });
    }
    catch (e) {
        if (e instanceof Error) {
            return res.json({
                message: e.message
            });
        }
        return res.json({
            message: "Missing error"
        });
    }
});
exports.createAccount = createAccount;
