import {config} from "dotenv";


config();

export const email_sender = process.env.EMAIL || "luisvillalb03@gmail.com";
export const email_password = process.env.EMAIL_PASSWORD || "pgyp quis jtgh lwho";
export const db_uri = process.env.URI || "mongodb://127.0.0.1:27017/"