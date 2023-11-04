import server from "./app";
import { connection } from "./db/connectionDb";

const Port = 3000;

server.listen(Port,async()=>{
    await connection();
    console.log(`Server listening on port ${Port}`)
})
