import express from 'express'
import login from '../controllers/auth/login.js';
import signup from '../controllers/auth/signup.js';
import logout from '../controllers/auth/logout.js';

const router = express.Router();

router.post("/login", login)
router.post("/signup", signup)
router.post("/logout", logout)

export default router