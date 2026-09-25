import { v2 as cloudinary } from "cloudinary";
import ENV from './env.js';

cloudinary.config({
  cloud_name: ENV.CLOUDINARY_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_SECRET_KEY,
  secure: true
});

export const uploadBuffer = (buffer, options = {}) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                use_filename: false,
                unique_filename: true,
                overwrite: true,
                ...options,
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary error:", error);
                    reject(error);
                    return;
                }
                resolve(result);
            }
        );
        stream.end(buffer);
    });
};