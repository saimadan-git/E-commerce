import express from 'express';
import { register,login,forgotPassword,resetPassword } from '../controller/auth.controller.js';
const router = express.Router();

//register
router.post('/register', register);
//login
router.post('/login', login);
//forgot password
router.post('/forgot-password', forgotPassword);
//Reset password
router.post('/reset-password', resetPassword);
export default router;