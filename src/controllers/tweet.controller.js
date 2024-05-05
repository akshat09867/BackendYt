import {asychan} from "../utils/asynchandler.js"
import {apierr} from "../utils/apierr.js"
import {apires} from "../utils/apires.js"
import {Tweet} from "../models/tweets.model.js"
const createtweet=asychan(async(req,res)=>{
    const {content}=req.body
  try {
      const newtweet=await Tweet.create({content})
      return res
      .status(200)
      .json(
          new apires(200,newtweet,"created")
      )
  } catch (error) {
    new apierr(401,"not created tweet")
  }
})
const getusertweet=asychan(async(req,res)=>{
        // TODO: get user tweets
    const userid=req.user._id
   const usertweet= await Tweet.findById(userid)
   return res
   .status(200)
   .json(
    new apires(200,usertweet,"fetched user tweet")
   )
})
const updatetweet=asychan(async(req,res)=>{
    const {newContent}=req.body
    const userid=req.user._id
  const tweet=  await Tweet.findByIdAndUpdate(userid,{
    content:newContent
  },{
    new:true
  })
  return res
  .status(200)
  .json(
    new apires(200,tweet,"tweet updated")
  )

})
const deletetweet=asychan(async(req,res)=>{
    const userid=req.user._id
    const deltweet= await Tweet.findByIdAndDelete(userid)
    return res
    .status(200)
    .json(
        new apires(200,deltweet,"tweet deleted")
    )
})
export {createtweet,getusertweet,updatetweet,deletetweet}