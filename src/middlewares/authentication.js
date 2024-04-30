import jwt from 'jsonwebtoken'
import { asynchan } from '../utils/asynchandler.js'
import { apierr } from '../utils/apierr.js'
import { User } from '../models/user.model.js'
export const verifyjwt=asynchan(async(req,res,next)=>{
    try {
        const token=req.cookies?.accesst ||  req.header("Authorization")?.replace("Bearer ", "")
        const decodedtoken=jwt.verify(token,process.env.accesssecret)
        if(!decodedtoken) throw new apierr(401,"invalid access token")
        const user=await User.findById(decodedtoken._id).select("-password -refreshtoken")
        req.user=user
        next()
    } catch (error) {
        console.log(error);
        throw new apierr(400,"decoded token error")
    }

})