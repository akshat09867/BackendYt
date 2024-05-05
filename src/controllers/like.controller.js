import {asychan} from "../utils/asynchandler.js"
import {apierr} from "../utils/apierr.js"
import {apires} from "../utils/apires.js"
import {Video} from "../models/video.model.js"
import {Like} from "../models/likes.model.js"
import {Comment} from "../models/comments.model.js"
import {Tweet} from "../models/tweets.model.js"
const togglevideolike=asychan(async(req,res)=>{
/*
    take videoid from params
    fetch videoid from database   
    check if user already liked that video or not
    if yes then on clicking again unlike it
    else like it
    save 
    return response 
    .filter(): This method creates a new array with all elements that pass the test implemented by the provided function.
*/
    const {videoId}=req.params
   const video=await Video.findById(videoId)
   if(!video) throw new apierr(401,"video not founded")
    const userid=req.user._id
   const liking=video.likes.includes(userid)
   if(!liking)video.likes.push(userid)
   elsevideo.likes=Like.video.filter(_id=>_id!==userid)
    await video.save()
    return res
    .status(200)
    .json(
        new apires(200,video,"video liked or unliked")
    )
})
const tooglecommentlike=asychan(async(req,res)=>{
    const {commentId}=req.params
    const userid=req.user._id
   const comment=await Comment.findById(commentId)
   if(!comment) throw new apierr(401,"video not founded")
   const alreadylikedc= await comment.likes.includes(userid)
    if(alreadylikedc) comment.likes=comment.likes.filter(_id=>_id!==userid)
    else comment.likes.includes(userid)
    comment.save()
    return res
    .status(200)
    .json(
        new apires(200,comment,"donee")
    )
})
const getlikedvideo=asychan(async(req,res)=>{
    const userid=req.user._id
   const likedvideo=await Like.find({userid})
   return res
   .status(200)
   .json(200,likedvideo,"fetched liked video")
})
const tweetliketoggle=asychan(async(req,res)=>{
     const {tweetid}=req.params
    const userid=req.user._id
    const tweet=await Tweet.findById(tweetid)
   const alreadylikedt= await tweet.likes.include(userid)
   if(alreadylikedt) tweet.likes=tweet.likes.filter(id=>id!==userid)
   else tweet.likes.push(userid)
     await tweet.save()
return res
.status(200)
.json(
    new apires(200,alreadylikedt,"doneeeee")
)
})
export {togglevideolike,tooglecommentlike,getlikedvideo,tweetliketoggle}