import { registration } from "../controllers/user.controllers.js";
import { Router } from "express";
const router=Router()
Router.route("/registration").post(upload.fields
    ([
{  name:"avatar",
    maxCount:1,
},
{
name:"coverimage",
maxCount:1
}])
,registration)
export {router}