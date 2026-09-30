import express from 'express'
import { getSettings, updateSettings } from '../../controllers/v3/setting.controller.js';
import authorize from '../../middleware/auth.middleware.js';

const settingRoutes = express.Router();

settingRoutes.get("/", authorize, getSettings);
settingRoutes.patch("/", authorize, updateSettings);

export default settingRoutes;