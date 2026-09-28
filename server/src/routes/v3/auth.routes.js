import express from 'express';
import { getCurrentUser, refreshToken, signIn, signOut, signoutAll, signUp, requestPasswordReset, resetPassword } from '../../controllers/v3/auth.controller.js';
import authorize from '../../middleware/auth.middleware.js';

const authRoutes = express.Router();

authRoutes.get("/me", authorize, getCurrentUser)
authRoutes.post("/signup", signUp)
authRoutes.post("/signin", signIn)
authRoutes.post("/signout", authorize, signOut)
authRoutes.post("/signout-all", authorize, signoutAll)
authRoutes.post("/refresh", refreshToken)
authRoutes.post("/request-reset", requestPasswordReset)
authRoutes.post("/reset", resetPassword)


export default authRoutes;