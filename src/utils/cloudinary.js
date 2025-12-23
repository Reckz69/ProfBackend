import {v2 as cloudinary}  from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

const getPublicIdFromUrl = (imageUrl) => {
  try {
    if (!imageUrl) throw new Error("imageUrl is required");

    const url = new URL(imageUrl);
    const path = url?.pathname ?? "";

    const parts = path?.split("/");
    let resource_type = "";

    if (parts.includes("video")) resource_type = "video";
    else if (parts.includes("image")) resource_type = "image";

    const filename = parts?.pop() ?? "";
    const publicId = filename?.split(".")?.[0] || null;

    return { publicId, resource_type };
  } catch (error) {
    return null;
  }
};


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


const deleteImageFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) throw new Error("No image URL provided");

    const { publicId, resource_type } = getPublicIdFromUrl(imageUrl);

    if (!publicId) {
      throw new Error("No image url provided");
    }

    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type,
    });
    // console.log(response);

    if (response.result !== "ok") {
      throw new Error(
        "Something went wrong while deleting image from cloudinary"
      );
    }

    return response.result;
  } catch (error) {
    console.log("Error in deleting image file", error);
    return false;
  }
};




export { uploadToCloudinary, deleteImageFromCloudinary };



