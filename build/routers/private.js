"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../middleware/authentication");
const privateRouter = (0, express_1.Router)();
privateRouter.get("/myAccount", authentication_1.verifyConnection, (_req, res) => {
    res.render("myAccount");
});
exports.default = privateRouter;
