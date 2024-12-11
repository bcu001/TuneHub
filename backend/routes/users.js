import express from "express";
import { getUser, getUsersData } from "../controllers/user.js";

const router = express.Router();

router.get("/find/:userID", getUser);
router.get("/users-data", getUsersData);

export default router;
