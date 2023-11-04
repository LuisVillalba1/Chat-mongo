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
const express_1 = require("express");
const sigin_1 = require("../utils/sigin");
const createAccount_1 = require("../utils/createAccount");
const forgotPassword_1 = require("../utils/forgotPassword");
const changePassword_1 = require("../helpers/changePassword");
const inicioRouter = (0, express_1.Router)();
//sig-in
inicioRouter.get("/", (_req, res) => {
    res.render("main");
});
//sig-in check account
inicioRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, sigin_1.checkAccount)(req.body, res);
}));
//create account
inicioRouter.get("/login", (_req, res) => {
    res.render("createAccount");
});
//create account check
inicioRouter.post("/login/createAccount", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, createAccount_1.createAccount)(req.body, res);
}));
//forgot password link
inicioRouter.get("/forgotPassword", (_req, res) => {
    res.render("forgotPassword");
});
//send a email
inicioRouter.post("/forgotPassword", (req, res) => {
    (0, forgotPassword_1.getAccountData)(req.body, res);
});
//recuperate account
inicioRouter.get("/recuperatePassword/:token", (_req, res) => {
    res.render("recuperateAccount");
});
//check the password to the account
inicioRouter.post("/recuperatePassword/:token", (req, res) => {
    (0, changePassword_1.changePassword)(req, res);
});
exports.default = inicioRouter;
