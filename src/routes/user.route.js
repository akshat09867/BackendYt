import {registration,login,logout,refreshaccesstoken,newpass,getcurrentuser,updateAccountDetails,updateavatar,updatecoveri,getuserprofile,watchHistory} 
from "../controllers/user.controllers.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { verifyjwt } from "../middlewares/authentication.js";
const router=Router()
router.route("/registration").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverimage",
            maxCount: 1
        }
    ]),
    registration
    )
router.route("/login").post(login)
router.route("/logout").get(verifyjwt,logout)
router.route("/refresh").get(refreshaccesstoken)
router.route("/newpass").post(verifyjwt,newpass)
router.route("/newpass").post(verifyjwt,getcurrentuser)
router.route("/newpass").patch(verifyjwt,updateAccountDetails)
router.route("/newpass").patch(verifyjwt,updateavatar)
router.route("/newpass").patch(verifyjwt,updatecoveri)
router.route("/newpass").get(verifyjwt,getuserprofile)
router.route("/newpass").get(verifyjwt,watchHistory)


export default router