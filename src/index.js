import dbconecction from "./database/connection.js";
import dotenv from 'dotenv'
import {app} from "./app.js";
dotenv.config({
    path:'./.env'
})
dbconecction()
.then(()=>
    {
        app.listen(process.env.PORT||4500,()=>{
        console.log(`port is ${process.env.PORT}`);
    })}
).catch(()=>{console.log("mongodb connection failed")})