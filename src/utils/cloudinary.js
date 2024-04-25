import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});
const uploadcloudinary=async(localfilepath)=>{
    try {
        if(!localfilepath) return null
       const instanceu= await cloudinary.uploader.upload(localfilepath,{
        resource_type:"auto"
       })
       fs.unlinkSync(localfilepath)
       return instanceu
    } catch (error) {
        fs.unlinkSync(localfilepath)
        console.log("uploading err:",error);
        return null
    }
}