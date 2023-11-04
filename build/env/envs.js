"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db_uri = exports.email_password = exports.email_sender = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.email_sender = process.env.EMAIL || "luisvillalb03@gmail.com";
exports.email_password = process.env.EMAIL_PASSWORD || "pgyp quis jtgh lwho";
exports.db_uri = process.env.URI || "mongodb://127.0.0.1:27017/";
