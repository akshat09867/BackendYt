import dbconecction from "./database/connection.js";
import express from 'express'
import dotenv from 'dotenv'
const app=express()
dotenv.config({
    path:'./env'
})
dbconecction()
.then(()=>
    {app.listen(process.env.PORT||4500)}
).catch(()=>{console.log("mongodb connection failed")})