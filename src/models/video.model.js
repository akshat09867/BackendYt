import mongoose, { Schema } from "mongoose";
const videosch=new mongoose.Schema({
    videofile:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    description:{
        type:String,
        required:true
    },
    
},{timestamps:true})
export const Video=mongoose.model("Video",videosch)