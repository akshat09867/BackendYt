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
    duration:{
        type:String,
        required:true
    },
    views:{
        type:number,
        default:0,
        required:true
    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    isPublished:{
        type:bool,
    }
},{timestamps:true})
export const Video=mongoose.model("Video",videosch)