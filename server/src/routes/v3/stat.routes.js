import express from 'express'
import { likeSong, unLikeSong } from '../../controllers/v3/stat.controller.js';
import authorize from '../../middleware/auth.middleware.js';

const statRouter = express.Router();

statRouter.post("/:id", authorize,likeSong)
statRouter.delete("/:id", authorize,unLikeSong)

export default statRouter;