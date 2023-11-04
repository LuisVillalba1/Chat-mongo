import { Router } from "express";
import { checkAccount } from "../utils/sigin";
import { createAccount } from "../utils/createAccount";
import { getAccountData } from "../utils/forgotPassword";
import { changePassword } from "../helpers/changePassword";

const inicioRouter = Router();

//sig-in
inicioRouter.get("/",(_req,res)=>{
    res.render("main")
})

//sig-in check account
inicioRouter.post ("/",async(req,res)=>{
    await checkAccount(req.body,res)
})

//create account
inicioRouter.get("/login",(_req,res)=>{
    res.render("createAccount")
})

//create account check
inicioRouter.post("/login/createAccount",async(req,res)=>{
    await createAccount(req.body,res)
})

//forgot password link
inicioRouter.get("/forgotPassword",(_req,res)=>{
    res.render("forgotPassword")
})

//send a email
inicioRouter.post("/forgotPassword",(req,res)=>{
    getAccountData(req.body,res)
})

//recuperate account
inicioRouter.get("/recuperatePassword/:token",(_req,res)=>{
    res.render("recuperateAccount")
})

//check the password to the account
inicioRouter.post("/recuperatePassword/:token",(req,res)=>{
    changePassword(req,res)
})


export default inicioRouter