import express from 'express';
import userRoutes from './user.routes.js'

const Router = express.Router();

Router.use("/users", userRoutes);


export default Router;