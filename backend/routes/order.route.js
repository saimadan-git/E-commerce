import express from 'express';
import {createOrder,verifyPayment,getAllOrders,getOrderById} from '../controller/orders.controller.js';
import { get } from 'mongoose';
const router = express.Router();
//Create Order
router.post('/createOrder', createOrder);
//Verify Payment
router.post('/verifyPayment', verifyPayment);
//Get All Orders
router.get('/getOrders/:userId',getAllOrders);
export default router;
router.get('/getOrderById/:orderId', getOrderById);