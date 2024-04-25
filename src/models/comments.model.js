import mongoose,{Schema} from "mongoose";
const comsch=new Schema({
    content:{
        type:string,
        required:true
    },
    video:{
        type: Schema.Types.ObjectId,
        ref:"Video"
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})
export const Comment=mongoose.model("Comment",comsch)