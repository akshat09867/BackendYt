import {asychan} from "../utils/asynchandler.js"
import {apierr} from "../utils/apierr.js"
import {apires} from "../utils/apires.js"
import {Comment} from "../models/comments.model.js"
const getcomment=asychan(async(req,res)=>{
    const {videoId}=req.params
    const {page=1,limit=9}=req.query
   try {
    const comments=await Comment.find({videoId})
    .skip((page-1)*limit)
    .limit(limit)
    if (!comments.length) throw new apierr(400,"comments not fetched")
    return res
    .status(200)
    .json(apires(200,comments,"all comments are fetched!!"))
   } catch (error) {
    throw new apierr(500,"error occured")
   }
})
const addComment= asychan(async(req,res)=>{
    const {videoId}=req.params
    const {content}=req.body
    const newcomment=new Comment({videoId,content})
   const savedcomment= await newcomment.save()
   return res 
   .status(200)
   .json(
    new apires(200,savedcomment,"comment added")
   )
})
const deleteComment = asychan(async (req, res) => {
    // TODO: delete a comment
    const {commentId}=req.params
    await Comment.findByIdAndDelete(commentId)
    return res
    .status(200)
    .json(
        new apires(200,"comment deleted")
    )
    
})
const updatecomment=asychan(async(req,res)=>{
      // TODO: update a comment
    const {commentId}=req.params
    const {updatedcontent}=req.body
   const updatecomment= await Comment.findByIdAndUpdate(commentId,{
        $set:{content:updatedcontent}
    },{new:true})
    return res
    .status(200)
    .json(
        new apires(200,updatecomment,"comment is updated")
    )
})
export {getcomment,addComment,updatecomment,deleteComment}