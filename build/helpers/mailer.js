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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const envs_1 = require("../env/envs");
//create a transporter with our email data
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: envs_1.email_sender,
        pass: envs_1.email_password
    }
});
//send email to recuperate the account
const sendEmail = (email, jwt) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        transporter.sendMail({
            from: `"Forgot password" <${envs_1.email_sender}>`,
            to: email,
            subject: "Forgot password ✔",
            html: `
            <p style="font-size:18px">Please enter to next link to recuperate your account</p>
            <a href="http://localhost:3000/api/recuperatePassword/${jwt}" style:"text-decoration:none,font-size:21px">Click here</a>
            <b style="font-size:18px">This link will expired in 1 hour</b>
            `
        });
    }
    catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message);
        }
        throw new Error("Missing Error");
    }
});
exports.sendEmail = sendEmail;
