import { Router } from "express";
import { getUsers, getUserById } from "../../controllers/v3/user.controller.js";
import authorize from "../../middleware/auth.middleware.js";

const userRoutes = Router();

userRoutes.get('/', authorize, getUsers)

userRoutes.get('/:id', authorize, getUserById)

export default userRoutes;