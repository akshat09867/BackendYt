import mongoose from "mongoose";
const tweetsch=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:string,
        required:true
    }
},{timestamps:true})
export const Tweet=mongoose.model("Tweet",tweetsch)