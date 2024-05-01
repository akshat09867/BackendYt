import { asynchan } from "../utils/asynchandler.js"
import { apierr } from "../utils/apierr.js"
import { apires } from "../utils/apires.js"
import { User } from "../models/user.model.js"
import { uploadcloudinary } from "../utils/cloudinary.js"
import jwt from 'jsonwebtoken'
import mongoose from "mongoose"
const genaccessandrefresht=async(id)=>{
    try {
       const user=await User.findById(id)
       if(!user) console.log("Error:");
      const accesst=user.generateaccesstoken() 
     const  refresht=user.generaterefreshtoken()
       user.refresht=refresht
 await user.save({validateBeforeSave:false})
       return {accesst,refresht}
    } catch (error) {
        throw new apierr(500,"gen token")
    }
}
const registration=asynchan(async(req,res)=>{
    /*
        taking data from frontend
        validate it
        check if user already exist
        check coveti, avatar
        upload them to cloudinary
        check for avatar
        create entry in db
        remove pass refreshtoken
        check user
        send res    
    */ 
   const {fullname,email,username,password}=req.body
   if(fullname.trim()==="") throw new apierr("300","fullname is required")
   if(email.trim()==="") throw new apierr("300","email is required")
   if(password.trim()==="") throw new apierr("300","password is required")
   if(username.trim()==="") throw new apierr("300","username is required")
   const existedUser =await User.findOne({
   $or:[{username},{email}]
                })
                
  if(existedUser) throw new apierr("302","user already exist")
  const avatarlp=req.files?.avatar[0]?.path
console.log(avatarlp);
   if(!avatarlp) throw new apierr(309,"avatar is required")    
   let coverlp;
    if (req.files && Array.isArray(req.files.coverimage) && req.files.coverimage.length > 0) {
        coverlp = req.files.coverimage[0].path
    }       
  const avatar= await uploadcloudinary(avatarlp)
  
  const coverimage= await uploadcloudinary(coverlp)

  if(!avatar) throw new apierr(400,"avatar not uploaded")
  const user=await User.create({
                   fullname,email,avatar:avatar.url,username,coverimage:coverimage?.url||"",password         
})

const createduser=await User.findById(user._id).select("-password -refreshtoken")
if(!createduser) throw new apierr(401,"user not created")
return res
.status(200)
.json(
     new apires(200,createduser,"user registered successfully")
)
})
const login=asynchan(async(req,res)=>{
    const {username,email,password}=req.body
    if(!(username||email)) throw new apierr(302,"one of them is required")
  const user=await User.findOne({
    $or:[{username},{email}]
})
if(!user) throw new apierr(402,"user not found")
 const checkpass=await user.passcorrect(password)
 if(!checkpass) throw new apierr(300,"password is wrong")
 const {accesst,refresht}=await genaccessandrefresht(user._id)

const loginuser=await User.findById(user._id).select("-password -refreshtoken")
const options = {
    httpOnly: true,
    secure: true
}
 return res
 .status(200)
 .cookie("accesst",accesst,options)
 .cookie("refresht",refresht,options).json(
    new apires(200,{user:loginuser,accesst,refresht},"user logged in successfully")
 )
})
const logout=asynchan(async(req,res)=>{
   const user=await User.findByIdAndUpdate(req.user?._id,{
    $unset:{refreshtoken:1}
   })
   const options={
    secure:true,
    httpOnly:true
   }
   return res
   .status(200)
   .clearCookie("accesst",options)
   .clearCookie("refresht",options)
   .json(
    new apires(200,"user logged out successfully")
   )
})
const refreshaccesstoken=asynchan(async(req,res)=>{
    
        const incomingtoken=req.cookies?.refresht 
        const decodedtoken=jwt.verify(incomingtoken,process.env.refreshsecret)
        console.log(decodedtoken);
       const user=await User.findById(decodedtoken?._id)
    const options={
        httpOnly:true,
        secure:true
    }
    console.log(user._id);
    const {access,refresh}=await genaccessandrefresht(user._id)
    return res
    .status(200)
    .cookie("accesst",access,options)
    .cookie("refresht",refresh,options)
    .json(
        new apires(200,{accesstoken:access,refreshtoken:refresh},"access token refreshed")
    )
    
})
const newpass=asynchan(async(req,res)=>{
    const {password,newpassword,confirmpassword}=req.body
    if(newpassword!==confirmpassword) throw new apierr(403,"pass dosen't match")
    const user=await User.findById(req.user?._id)
   const checking=await  user.passcorrect(password)
   console.log(checking);
   if(!checking) throw new apierr(500,"invalid password")
   user.password=newpassword
await user.save({validateBeforeSave:false})
return res
.status(200)
.json(
    new apires(200,"password changed")
)
})
const getcurrentuser=asynchan(async(req,res)=>{
    return res
    .status(200)
    .json(
      new apires(200,req.user,"current user")
    )
})
const updateAccountDetails=asynchan(async(req,res)=>{
    const {fullname,email}=req.body
    if(!(fullname||email)) throw new apierr(300,"all fields are required")
   const user=await User.findByIdAndUpdate(req.user._id,{
    $set:{
        fullname,email
    }},{   
    new:true
}).select("-password -refreshtoken")
return res
.status(200)
.json(200,user,"updated successfully")
})
const updateavatar=asynchan(async(req,res)=>{
    const avatarlp=req.file.path
    const avatar=await uploadcloudinary(avatarlp)
    if(!avatar) throw new apierr(302,"avatar not uploaded")
   const user=await User.findByIdAndUpdate(req.user._id,{
        $set:{avatar:avatar.url}
    },{new:true}).select("-password -refreshtoken")
    return res
    .status(200)
    .json(
        new apires(200,user,"avatar updated")
    )
})
const updatecoveri=asynchan(async(req,res)=>{
    const coverilp=req.file?.path
    const coverimage=await uploadcloudinary(coverilp)
    if(!coverimage) throw new apierr(402,"not uploaded")
   const user=await User.findByIdAndUpdate(req.user._id,{
$set:{coverimage:coverimage.url}},
{new:true}).select("-password")
return res
.status(200)
.json(200,user,"coverimage updated")
})
const getuserprofile=asynchan(async(req,res)=>{
    const {username}=req.params
    if(!username.trim()) throw new apierr(401,"user not founded")
    const channel=await User.aggregate([{
            $match:{username:username}
            },{
                $lookup:{
                    from:"subscriptions",
                    localField:"_id",
                    foreignField:"channel",
                    as:"channelsubscribed"
                }
            },{
                $lookup:{
                    from:"subscriptions",
                    localField:"_id",
                    foreignField:"subscriber",
                    as:"subscribers"
                }
            },{
                $addFields:{
                    subscribercount:{
                        $size:"$channelsubscribed"
                    },
                    subcribedcount:  {
                        $size:"$subscribers"
                    },
                    isSubscribed:{
                        $cond:{
                            if:{$in:[req.user._id,"$subscribers.subscriber"]},
                            then:true,
                            else:false
                        }
                    }
                }
            },{
                $project:{
                    username:1,email:1,subcribedcount:1,subscribercount:1,coverimage:1,avatar:1,isSubscribed:1
                }
            }]
        )
        if(!channel.length) throw new apierr(401,"channel not found")
        return res
    .status(200)
    .json(200,channel[0],"user details fetched succesfully")
})
const watchHistory=asynchan(async(req,res)=>{
    const user=await User.aggregate([{
        $match:{
            _id:new mongoose.Types.ObjectId(req.user._id)
        }
    },{
        $lookup:{
            from:"videos",
            localField:"watchhistory",
            foreignField:"_id",
            as:"watchhistory",
            pipeline:[
                {
                    $lookup:{
                        from:"users",
                        foreignField:"_id",
                        localField:"owner",
                        as:"owner"
                    ,
                    pipeline:[
                        {
                            $project:{
                                fullname:1,username:1,avatar:1
                            }
                        }
                    ]
                }
                },
                {
                    $addFields:{
                        owner:{
                            $first:"$owner"
                        }
                    }
                }
                
            ]
        }
    }])
    return res
    .status(200)
    .json(new apires(200,user[0].watchHistory,"watch history fetched successfully"))
})
export {registration,login,logout,refreshaccesstoken,newpass,getcurrentuser,updateAccountDetails,updateavatar,updatecoveri,getuserprofile,watchHistory}