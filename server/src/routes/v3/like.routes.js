import express from 'express'
import authorize from '../../middleware/auth.middleware.js';
import { getSongLikeCount, getSongLikesStatus, unlikeSong, likeSong } from '../../controllers/v3/likes.controller.js';

const likeRoutes = express.Router();

likeRoutes.post('/:songId', authorize, likeSong);
likeRoutes.delete('/:songId', authorize, unlikeSong);
likeRoutes.get('/:songId/status', authorize, getSongLikesStatus);
likeRoutes.get("/:songId/count", authorize, getSongLikeCount)

export default likeRoutes;