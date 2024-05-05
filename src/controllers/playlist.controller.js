import {asychan} from "../utils/asynchandler.js"
import {apierr} from "../utils/apierr.js"
import {apires} from "../utils/apires.js"
import {Playlist} from "../models/playlists.model.js"
import {Video} from "../models/videos.model.js"
import mongoose,{isValidObjectId} from "mongoose"
    const createplaylist=asychan(async(req,res)=>{
    const {name,description}=req.body
    try {
        const playlist=await Playlist.create({name,description})
        return res
        .status(200)
        .json(new apires(200,playlist,"playlist created"))
    }
    catch (error) {
        throw new apierr(400,"playlist not created")
    }})
    const getuserplaylist=asychan(async(req,res)=>{
        const {userId}=req.params
        const checking= mongoose.isValidObjectId(userId)
        if(!checking) throw new apierr(500,"user not found")
       const getplaylist= await Playlist.find({userId})
        return res
        .status(200)
        .json(
            new apires(200,getplaylist,"fetched user playlist")
        )
    })  
    const getPlaylistById=asychan(async(req,res)=>{
        const {playlistId}=req.params
        const playlist=await Playlist.findById(playlistId)
        return res
        .status(200)
        .json(new apires(200,playlist,"done"))
    })
    const addvideotoplaylist=asychan(async(req,res)=>{
        //todo- add videos to playlist
        const {playlistId, videoId} = req.params
        const videos=await Video.findById(videoId)
        const playlist=await Playlist.findById(playlistId)
        const checking= playlist.video.include(videos)
        if(!checking) playlist.video.push(videos)
       await playlist.save()
    return res
    .status(200)
    .json(
      new apires(200,"videos added")  
    )
    })
    const removevideofromplaylist=asychan(async(req,res)=>{
        const {playlistId, videoId} = req.params
        const playlist=await Playlist.findById(playlistId)
        playlist.video.filter(vid=>vid.tostring()!==videoId)
        return res
        .status(200)
        .json(new apires(200,"video removed"))
    })
    const deleteplaylist=asychan(async(req,res)=>{
        const {playlistId}=req.params
        await Playlist.findByIdAndDelete(playlistId)
        return res
        .status(200)
        .json(new apires(200,"deleted  playlist"))
    })
    const updateplaylist=asychan(async(req,res)=>{
        const {playlistId}=req.params
        const {name,description}=req.body
       const updatedplaylist= await Playlist.findByIdAndUpdate(playlistId,{
            name,description
        },{new:true})
        return res
        .status(200)
        .json(new apires(200,updatedplaylist,"playlist updated"))
    })
    export {createplaylist, getuserplaylist, getPlaylistById, addvideotoplaylist, removevideofromplaylist, deleteplaylist,updateplaylist                 }