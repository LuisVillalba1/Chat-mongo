import express from "express";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import inicioRouter from "./routers/inicio";
import morgan from "morgan";
import privateRouter from "./routers/private";
import { getUserCokkie } from "./utils/getDataCookie";

const app = express();

//get the current directory
export const __dir = path.dirname(__filename);

//set ejs how our view engine
app.set('view engine', 'ejs');

//set where it is ours .ejs documents
app.set("views",path.join(__dir,"views"))

//convert all request to json
app.use(express.json());

app.use(morgan("tiny"))

app.use("/api/",inicioRouter);
app.use("/api/",privateRouter);

//set where its our static documents
app.use(express.static(path.join(__dir,"public")));


//create our server
const server = http.createServer(app);

const io = new Server(server,{
    //if the user has not wifi, he can received the msgs later
    connectionStateRecovery : {}
});

io.on("connection",async(socket)=>{
    socket.on("message", async (msg) => {
        try {
            //get userName with socket
            const userName = await getUserCokkie(socket);
            io.emit("chat message", {
                message : msg,
                user : userName
            });
        } catch (error) {
            //if the the token if not valid return a msg error
            socket.emit("chat message",{
                message : "Current userName not found, please sign-in again"
            })
        }
    });
})
export default server