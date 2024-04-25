import mongoose, { Schema } from "mongoose";
const videosch=new mongoose.Schema({
    videofile:{
        type:string,
        required:true
    },
    thumbnail:{
        type:string,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    description:{
        type:string,
        required:true
    },
    duration:{
        type:string,
        required:true
    },
    views:{
        type:number,
        default:0,
        required:true
    },
    title:{
        type:string,
        required:true
    },
    isPublished:{
        type:bool,
    }
},{timestamps:true})
export const Video=mongoose.model("Video",videosch)