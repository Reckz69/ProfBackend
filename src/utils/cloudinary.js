import {v2 as cloudinary}  from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

const uploadToCloudinary = async (localFilePath) => {
    if (!localFilePath) return null; // Handle null/undefined path upfront

    try {
        // Upload to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        // SUCCESS: File uploaded successfully, now remove the local temporary file
        fs.unlinkSync(localFilePath);
        //console.log("File has been uploaded successfully", response.url);
        return response;

    } catch (error) {
        // Log full error details for debugging
        console.error("Cloudinary upload failed:", error);
        if (error.response) {
            console.error("Cloudinary error response:", error.response.body || error.response);
        }
        // ERROR: Remove the local temporary file
        try {
            if (fs.existsSync(localFilePath)) {
                fs.unlinkSync(localFilePath);
            }
        } catch (unlinkError) {
            console.error("Error while deleting local file:", unlinkError);
        }
        return null;
    }
}

export { uploadToCloudinary };



