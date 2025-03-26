import Order from '../models/order.js'
import User from '../models/Register.js'
import Product from '../models/products.js'
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
//Razorpay Configuration
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});
//Create Order With Razorpay Payment Gateway
export const createOrder= async (req, res) => {
    const { userId,items,amount } = req.body;
    try{
        const options={
            amount:amount*100,
            currency:"INR",
            receipt:`receipt_order_${userId}`,
    };
    const order = await razorpay.orders.create(options);
    const newOrder = new Order({
        userId,
        items,
        amount,
        orderId:order.id,
        paymentStatus:"pending",
        status:"pending"
    });
    await newOrder.save();
    res.status(201).json({
        status:"success",
        message:"Order created successfully",
        data:order
    });
}catch(err){
    res.status(500).json({
        status:"error",
        message:"Internal server error",
        error:err.message
    });
}
}
//Verify Payment
export const verifyPayment = async (req, res) => {
    const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body;
    try{
        console.log("Razorpay Order ID:", razorpay_order_id);
        console.log("Razorpay Payment ID:", razorpay_payment_id);
        console.log("Razorpay Signature:", razorpay_signature);
        const hmac = crypto.createHmac('sha256',process.env.RAZORPAY_KEY_SECRET);
        hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const generatedSignature = hmac.digest('hex');
        console.log("Generated Signature:", generatedSignature);

        if(generatedSignature === razorpay_signature){
            const order = await Order.findOneAndUpdate(
                {orderId:razorpay_order_id},
                {
                    paymentId:razorpay_payment_id,
                    paymentStatus:"Paid",
                    status:"Order Placed"
                },
                {new:true}
            );
            if (!order) {
                return res.status(404).json({
                    status: "error",
                    message: "Order not found in database."
                });
            }
            res.status(200).json({
                status:"success",
                message:"Payment verified successfully",
                data:order
            });
        }else{
            res.status(400).json({
                status:"error",
                message:"Payment verification failed"
            });
        }
}catch(err){
    res.status(500).json({
        status:"error",
        message:"Internal server error",
        error:err.message
    });
}
}