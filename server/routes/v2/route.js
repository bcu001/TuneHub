import express from 'express';
import userRoutes from './user.routes.js'
import authRoutes from "./auth.routes.js"
const Router = express.Router();

Router.use("/users", userRoutes);
Router.use("/auth", authRoutes)


export default Router;