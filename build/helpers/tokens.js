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
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//generate a token for recuperate a account
const generateToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const secretKey = "My_secret_key";
        //create a new token;
        //token expires one hour after it is generated
        const token = jsonwebtoken_1.default.sign(user, secretKey, { expiresIn: "1h" });
        return token;
    }
    catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message);
        }
        throw new Error("Missing error");
    }
});
exports.generateToken = generateToken;
