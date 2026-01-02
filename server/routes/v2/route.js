import express from 'express';
import userRoutes from './user.routes.js'
import authRoutes from "./auth.routes.js"
import songRoutes from './song.routes.js'
const Router = express.Router();

Router.use("/users", userRoutes);
Router.use("/auth", authRoutes)
Router.use("/songs", songRoutes);


export default Router;