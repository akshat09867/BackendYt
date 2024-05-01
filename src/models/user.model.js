import mongoose ,{Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const usersch=new Schema({
    username:{
        type:String,
        required:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true,"password is required"],
        trim:true,
    },
    avatar:{
        type:String,
        required:true,
    },
    coverimage:{
        type:String,
    },
    watchhistory:{
        type:Schema.Types.ObjectId,
        ref:"Video",
    },
    email:{
        type:String,
        required:true
    },
    refreshtoken:{
        type:String
    }
},{timestamps:true})
usersch.pre("save",async function(next){
    if(!this.isModified) return next;
    this.password=await bcrypt.hash(this.password,10)
})
usersch.methods.passcorrect = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.error("Error comparing passwords:", error);
        return false; 
    }
}

usersch.methods.generateaccesstoken=function(){
   return  jwt.sign({
    _id: this._id,
    username:this.username,
    email:this.email,
fullname:this.fullname},
    process.env.accesssecret,
    {
        expiresIn:process.env.accesse
    })
}
usersch.methods.generaterefreshtoken= function(){
  return jwt.sign({
    _id:this._id
},
    process.env.refreshsecret,
    {
        expiresIn:process.env.refreshe
    })
}
export const User=mongoose.model("User",usersch) 