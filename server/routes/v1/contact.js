import express from "express";
import { sendMessage } from "../../controllers/v1/contact.js";
const router = express.Router();

router.post("/send-message", sendMessage);

export default router;
