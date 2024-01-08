import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilepath) => {
  try {
    if (!localFilepath) {
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilepath, {
      resource_type: "auto",
    });
    console.log("file uploaded successfully", response.url);
    return response;
  } catch (error) {
    console.log("Cloudinary error", error);
    fs.unlinkSync(localFilepath);
    return { url: " " };
  }
};
