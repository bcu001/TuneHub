import { db } from "../connect.js";
import multer from "multer";
import path from "path";


export const uploadImage = (req, res) => {
    console.log(req.file);
    // console.log(`Path: ${req.file.path} \n fileName: ${req.file.filename}`);

}