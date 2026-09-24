import express from 'express'
import { likeSong, unLikeSong } from '../../controllers/v3/stat.controller.js';

const statRouter = express.Router();

statRouter.post("/:id",likeSong)
statRouter.delete("/:id",unLikeSong)

export default statRouter;