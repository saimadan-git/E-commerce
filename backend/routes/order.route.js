import express from 'express';
import {createOrder,verifyPayment} from '../controller/orders.controller.js';
const router = express.Router();
//Create Order
router.post('/createOrder', createOrder);
//Verify Payment
router.post('/verifyPayment', verifyPayment);
export default router;