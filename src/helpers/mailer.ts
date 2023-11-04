import nodemailer from "nodemailer";
import { email_sender, email_password } from "../env/envs";

//create a transporter with our email data
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: email_sender,
      pass: email_password
    }
});

//send email to recuperate the account
export const sendEmail = async(email : string,jwt : string):Promise<void> | never=>{
    try{
        transporter.sendMail({
            from : `"Forgot password" <${email_sender}>`,
            to : email,
            subject : "Forgot password ✔",
            html : `
            <p style="font-size:18px">Please enter to next link to recuperate your account</p>
            <a href="http://localhost:3000/api/recuperatePassword/${jwt}" style:"text-decoration:none,font-size:21px">Click here</a>
            <b style="font-size:18px">This link will expired in 1 hour</b>
            `
        })
    }
    catch(e){
        if(e instanceof Error){
            throw new Error(e.message)
        }
        throw new Error("Missing Error")
    }
}