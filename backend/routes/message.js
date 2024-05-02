import express from 'express'
const router = express.Router();

import sendMessage from '../controllers/messages/sendMessage.js'
import getMessages from '../controllers/messages/getMessages.js'
import protectRoute from '../middleware/protectRoute.js';

router.post("/send/:id", protectRoute, sendMessage)
router.get("/:id", protectRoute, getMessages)

export default router
