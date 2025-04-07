import Order from '../models/order.js'
import User from '../models/Register.js'
import Product from '../models/products.js'
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();
//Razorpay Configuration
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});
//Send Email to admin after order placed
const sendEmail = async (user,order) => {
    const ts= nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
        const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Order Received - Order ID: ${order._id}`,
        html: `
        <h3>New Order Placed</h3>
        <p><strong>Customer:</strong> ${user.name} (${user.email})</p>
        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Order Amount:</strong> ₹${order.amount}</p>
        <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
        <p><strong>Status:</strong> ${order.status}</p>
      `
    };
    try {
        await ts.sendMail(mailOptions);
        console.log("Email sent successfully to admin.");
    } catch (error) {
        console.error("Error sending email:", error.message);
    }
}
//Create Order With Razorpay Payment Gateway
export const createOrder= async (req, res) => {
    const { userId,items,amount,selectedAddress } = req.body;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({
            status: "error",
            message: "User not found"
        });
    }
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
        status:"pending",
        selectedAddress
    });
    const savedOrder = await newOrder.save();
    
    sendEmail(user,savedOrder);
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
//Get All Orders
export const getAllOrders = async (req, res) => {
    const { userId } = req.params;
    try{
        const orders = await Order.find({userId}).populate('items.productId').sort({orderDate:-1}).lean();
        if (!orders || orders.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No orders found for this user."
            });
        }
        res.status(200).json({
            status:"success",
            message:"Orders retrieved successfully",
            data:orders
        });
    }catch(err){
        res.status(500).json({
            status:"error",
            message:"Internal server error",
            error:err.message
        });
    }
}
//Get Order By ID
export const getOrderById = async (req, res) => {
    const { orderId } = req.params;
    try{
        const order = await Order.findById(orderId).populate('items.productId').lean();
        if (!order) {
            return res.status(404).json({
                status: "error",
                message: "Order not found."
            });
        }
        res.status(200).json({
            status:"success",
            message:"Order retrieved successfully",
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
//