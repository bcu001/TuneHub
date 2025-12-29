import express from "express";
import { getUsers, editUser, editRole, deleteUser } from "../../controllers/v1/user.js";

const router = express.Router();

// router.get("/users-data", getUsersData);
router.post("/edituser", editUser);
router.get("/getusers", getUsers);
router.patch("/editrole", editRole); // Update user role
router.delete("/deleteUser", deleteUser); // Delete user

export default router;
