import express from 'express';
import { searchSongsController } from '../../controllers/v3/search.controller.js';

const searchRouter = express.Router();

searchRouter.get('/songs', searchSongsController);

export default searchRouter;
