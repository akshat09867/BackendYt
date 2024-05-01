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
router.route("/getcurrentuser").post(verifyjwt,getcurrentuser)
router.route("/updateAccountDetails").patch(verifyjwt,updateAccountDetails)
router.route("/updateavatar").patch(verifyjwt,upload.single("avatar"),updateavatar)
router.route("/ucoveri").patch(verifyjwt,upload.single("coverimage"),updatecoveri)
router.route("/c/:username").get(verifyjwt,getuserprofile)
router.route("/watchHistory").get(verifyjwt,watchHistory)


export default router