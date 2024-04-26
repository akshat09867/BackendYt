import { asynchan } from "../utils/asynchandler.js"
import { apierr } from "../utils/apierr.js"
import { apires } from "../utils/apires.js"
import { User } from "../models/user.model.js"
import { uploadcloudinary } from "../utils/cloudinary.js"
const genaccessandrefresht=async(_id)=>{
    try {
       const user=await User.findById(this._id)
       accesst=user.generateaccesstoken() 
       refresht=user.generaterefreshtoken()
       user.refresht=refresht
     await  user.save({validateBeforeSave:false})
       return {accesst,refresht}
    } catch (error) {
        console.log(error);
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
  const avatarlp=req.fileS?.avatar[0]?.path
   if(!avatarlp) throw new apierr(309,"avatar is required")    
   if(req.files && req.files.cover[0] && req.files.cover[0].path){
    const coverlp= req.files.cover[0].path
   }         
  const avatar= await uploadcloudinary(avatarlp)
  if(coverlp)
  { const coveri= await uploadcloudinary(coverlp)
  }
  if(!avatar) throw new apierr(400,"avatar not uploaded")
  const user=await User.create({
                   fullname,email,avatar:avatar.url,username,coveri:coveri?.url||"",password         
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
    const {email,password}=req.body
  const user=  await User.findById(user._id)
 const checkpass= user.passcorrect(password)
 if(!checkpass) throw new apierr(300,"password is wrong")
 const {access,refresh}=await genaccessandrefresht(user._id)
const loginuser=User.findById(user._id).select("-password -refreshtoken")
const options={
    httpOnly:true,
    secure:true
}
 return res
 .status(200)
 .cookie("access",access,options)
 .cookie("refresh",refresh,options)
 .json(
    new apires(200,loginuser,"user logged in successfully")
 )
})
export {registration,login}