import express from 'express';
import { getCurrentUser, refreshToken, signIn, signOut, signoutAll, signUp } from '../../controllers/v3/auth.controller.js';

const authRoutes = express.Router();

authRoutes.get("/me", getCurrentUser)
authRoutes.post("/signup", signUp)
authRoutes.post("/signin", signIn)
authRoutes.post("/signout", signOut)
authRoutes.post("/signout-all", signoutAll)
authRoutes.post("/refresh", refreshToken)


export default authRoutes;