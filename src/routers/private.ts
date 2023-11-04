import { Router } from "express";
import { verifyConnection } from "../middleware/authentication";

const privateRouter = Router();


privateRouter.get("/myAccount",verifyConnection,(_req,res)=>{
    res.render("myAccount")
})



export default privateRouter