import {v2 as cloudinary} from "cloudinary";
import { response } from "express";
import fs from "fs";

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        // upload the file on clodinary
        cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // when file is uploaded successfully
        console.log("file is uploaded on cloudinary", response.url)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file when uploading fails
        return null
    }
}

export {uploadOnCloudinary}