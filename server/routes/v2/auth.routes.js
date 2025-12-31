import express from 'express';
import { signin, signout, signup, validate } from '../../controllers/v2/auth.controller.js';

const router = express.Router();

router.get("/validate", validate)
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signout", signout);

export default router;