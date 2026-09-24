import express from 'express'
import { getUserById, getUsers, updateUser } from '../../controllers/v2/user.controller.js';

const Router = express.Router();

Router.get("/", getUsers);
Router.get("/:id", getUserById);
Router.put("/:id", updateUser);

export default Router;