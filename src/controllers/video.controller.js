import mongoose from "mongoose";
import { User } from "../models/user.model.js"
import {Video} from "../models/video.model.js"
import { asynchan } from "../utils/asynchandler.js";
import {apierr} from "../utils/apierr.js"
import {uploadcloudinary} from "../utils/cloudinary.js"
import {apires} from "../utils/apires.js"
const getallvideos=asynchan(async(req,res)=>{
    const {page=1,limit=10,sortBy,sortType,query,userid}=req.query
    const filter={}
    if(query){
        filter={
            $or:[
               {title:{$regrex:query,$options:'i'}} ,
               {description:{$regrex:query,$options:'i'}}
            ]
        }
    }
    if(userid) filter.userid=userid
    let sort={}
    if(sortBy){
        sort[sortBy]=sortType==='des'?-1:1
    } 
    const video=await Video.find({filter})
    .sort(sort)
    .skip((page-1)*limit)
    .limit(limit)
    return res
    .status(200)
    .json(new apires(200,video,"fetched video"))
})
const publishAVideo = asynchan(async (req, res) => {
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video
   const video=await Video.find(
    {
        $and:[{title},{description}]
    }
   )
   if(!video) throw new apierr(300,"video not found")
   const videolp=video.filePath
   const videou=await uploadcloudinary(videolp)
   if(!videou) throw new apierr(400,"video not uploaded")
   const videos=await Video.create({title,description,videofile:videou.url})
return res
.status(200)
.json(
    new apires(200,videos,"video created in database")
)
})
const getVideoById = asynchan(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
    const video=await Video.findById(videoId)
    return res
    .status(200)
    .json(new apires(200,{video},"got video by id"))
})
const updatevideo=asynchan(async(req,res)=>{
    const {videoId}=req.params
    const {title,description,thumbnail}=req.body
   const video=await Video.findByIdAndUpdate(videoId,{
       $set:{title,description,thumbnail} 
    },{
        new:true
    })
    video.save()
    return res
    .status(200)
    .json(200,video,"updated successfully")
})
const delvideo=asynchan(async(req,res)=>{
    const {videoId}=req.params
    await Video.findByIdAndUpdate(videoId,{
       $unset:{videoId:1} 
    })
    return res
    .status(200)
    .json(200,"video deleted")
})
const togglepublishvideo=asynchan(async(req,res)=>{
    const {videoId}=req.params
    const video=await Video.findById(videoId)
    video.isPublished=!video.isPublished
    await video.save()
    return res
    .status(200)
    .json(new apires(200,video,"toggled published video"))
})
export {getallvideos, publishAVideo, getVideoById,updatevideo,delvideo,togglepublishvideo}