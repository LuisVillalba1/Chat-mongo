"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyConnection = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyConnection = (req, res, next) => {
    //read cookies
    if (req.headers.cookie && req.headers.cookie.length > 0) {
        //get the token value
        const token = req.headers.cookie.split("=")[1];
        if (!token) {
            return res.status(401).json({
                message: "deny access",
                type: "Error"
            });
        }
        //verify if the token with My_secret_key sign is valid
        jsonwebtoken_1.default.verify(token, "My_secret_key", (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    message: "Token not valid",
                    type: "Error"
                });
            }
            const user = decoded;
            req.user = user;
            return next();
        });
    }
    else {
        return res.redirect("/api/");
    }
};
exports.verifyConnection = verifyConnection;
