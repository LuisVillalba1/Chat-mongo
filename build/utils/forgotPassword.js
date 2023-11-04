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
exports.getAccountData = void 0;
const connectionDb_1 = require("../db/connectionDb");
const tokens_1 = require("../helpers/tokens");
const mailer_1 = require("../helpers/mailer");
//get the account data and send a email to recuperate the account
const getAccountData = (object, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = connectionDb_1.client.db("chat");
        const collection = db.collection("users");
        if ("email" in object) {
            //find the account
            const querry = { email: object.email };
            const user = yield collection.findOne(querry);
            if (user) {
                const userFound = {
                    email: user.email
                };
                const token = yield (0, tokens_1.generateToken)(userFound);
                yield (0, mailer_1.sendEmail)(userFound.email, token);
                return res.json({
                    message: "Check you mail account"
                });
            }
            throw new Error("Email not found in our db");
        }
        throw new Error("Please enter a email");
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
exports.getAccountData = getAccountData;
