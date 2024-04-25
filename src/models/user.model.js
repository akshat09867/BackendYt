import mongoose ,{Schema} from "mongoose";
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
    watchHistory:{
        type:Schema.Types.ObjectId,
        ref:"Video",
    },
    email:{
        type:string,
        required:true
    }
},{timestamps:true})
export const User=mongoose.model("User",usersch) 