import express from 'express';
import {getUserProfile, updateProfile } from '../controller/user.controller.js';
const router = express.Router();
//get user profile
router.get('/profile/:userId', getUserProfile);
//update profile
router.put('/updateUser/:userId', updateProfile);
export default router;