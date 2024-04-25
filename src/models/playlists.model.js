import mongoose from "mongoose";
const playlistsch=new mongoose.Schema({
    name:{
        type:string,
        required:true
    },
    description:{
        type:string,
        required:true
    },
    video:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})
export const Playlist=mongoose.model("Playlist",playlistsch)