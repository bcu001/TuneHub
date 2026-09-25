import { upload } from "../config/multer.js"

export const configureUploadFields = () => {
    return upload.fields([
        { name: "audio", maxCount: 1 },
        { name: "image", maxCount: 1 }
    ])
}