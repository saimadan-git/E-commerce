import express from 'express';
import {getUserProfile, updateProfile } from '../controller/user.controller.js';
import authMiddleware from '../middlewares/Authorization.js';
const router = express.Router();
//get user profile
router.get('/profile/:userId',authMiddleware, getUserProfile);
//update profile
router.put('/updateUser/:userId',authMiddleware, updateProfile);
export default router;