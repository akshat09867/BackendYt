import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app=express()
app.use(cookieParser())
app.use(cors({
origin:process.env.corsO,
credentials:true
}))
app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended:true,limit:"20kb"}))
app.use(express.static("public"))
import { router } from './routes/user.route.js'
app.use("./api/v1/users",router)
export {app}