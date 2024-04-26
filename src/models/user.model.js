import mongoose ,{Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const usersch=new Schema({
    username:{
        type:string,
        required:true,
        trim:true,
    },
    fullname:{
        type:string,
        required:true,
        trim:true,
    },
    password:{
        type:string,
        required:[true,"password is required"],
        trim:true,
    },
    avatar:{
        type:string,
        required:true,
    },
    coverimage:{
        type:string,
    },
    watchhistory:{
        type:Schema.Types.ObjectId,
        ref:"Video",
    },
    email:{
        type:string,
        required:true
    },
    refreshtoken:{
        type:string,
        required:true
    }
},{timestamps:true})
usersch.pre("save",async function(next){
    if(!this.isModified) return next;
    this.password=await bcrypt.hash(this.password,10)
})
usersch.methods.passcorrect=async function(password){
    return await bcrypt.compare(this.password,password)
}
usersch.methods.generateaccesstoken=function(){
   return  jwt.sign({
    _id: this._id,
    username:this.username,
    email:this.email},
    process.env.accesssecret,
    {
        expiresIn:process.env.accesse
    })
}
usersch.methods.generaterefreshtoken= function(){
  return jwt.sign({
    _id:this. _id},
    process.env.refreshsecret,
    {
        expiresIn:process.env.refreshe
    })
}
export const User=mongoose.model("User",usersch) 