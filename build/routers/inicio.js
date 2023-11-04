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
exports.default = inicioRouter;
