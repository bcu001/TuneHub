import express from 'express'
import { getCategories, getCategoryById } from '../../controllers/v3/category.controller.js';

const categoryRouter = express.Router();

categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", getCategoryById);

export default categoryRouter;