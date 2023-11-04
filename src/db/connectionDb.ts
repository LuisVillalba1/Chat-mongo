import {MongoClient} from "mongodb";
import { db_uri } from "../env/envs";

//set uri string locally
const uri = db_uri;

//connecting to our database
export const client = new MongoClient(uri);


export const connection = async()=>{
    try{
        await client.connect();
        console.log("DB connected")
    }
    catch(e){
        console.log(`Error connecting to the database:${e}`)
    }
}