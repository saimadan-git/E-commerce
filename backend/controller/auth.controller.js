import User from '../models/Register.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/generateToken.js';
import { response } from 'express';

//Register
export const register = async (req, res, next) => {
    const { name, email, mobileNumber, password } = req.body;
    try {
        const ExUser = await User.findOne({ email });
        if (ExUser) {
            return res.status(400).json({
                status: "error",
                message: "User already exists",
            });
        }
        const adminEmail=["malinifoods123@gmail.com"]
        let role="user";
        if(adminEmail.includes(email)){
            role = "admin"
        }
        const newUser = new User({
            name,
            email,
            mobileNumber,
            password,
            role,
        });
        const token = generateToken({id: newUser._id,name: newUser.name,email: newUser.email,mobileNumber: newUser.mobileNumber,address: newUser.address,role:newUser.role});
        const savedUser = await newUser.save();
        console.log(savedUser._id);
        res.cookie("token", token, { httpOnly: true });
        res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                mobileNumber: savedUser.mobileNumber,
                address: savedUser.address,
                role: savedUser.role,
                token,
                //password: savedUser.password,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: err.message,
        });
    }
}
// //Admin Registration
// export const adminRegister = async(req,res,next)=>{
//     const{name,email,mobileNumber,password}=req.body;
//     try{
//         const ExUser = await User.findOne({ email });
//         if(ExUser){
//             return res.status(400).json({
//                 status:"error",
//                 messege:"User Already Exists"
//             });
//         }
//         const admin = new User({
//             name,
//             email,
//             mobileNumber,
//             password,
//             role:"admin"
//         });
//         const token = generateToken({id: admin._id,name: admin.name,email: admin.email,mobileNumber: admin.mobileNumber,address: admin.address});
//         const savedAdmin = await admin.save();
//         console.log(role);
//         res.cookie("token", token, { httpOnly: true });
//         res.status(201).json({
//             status: "success",
//             message: "Admin created successfully",
//             data: {
//                 id: savedAdmin._id,
//                 name: savedAdmin.name,
//                 email: savedAdmin.email,
//                 mobileNumber: savedAdmin.mobileNumber,
//                 address: savedAdmin.address,
//                 token,
//             },
//         });
//     }
//     catch(err){
//         res.status(500).json({
//             status: "error",
//             message: "Internal server error",
//             error: err.message,
//         });
//     }
// }
//Login
export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
                data: {}
            });
        }
        if (password != user.password) {
            return res.status(401).json({ status: "error", message: "Invalid credentials.", data: {} });
        }
        const token = generateToken({id: user._id,name: user.name,email: user.email,mobileNumber: user.mobileNumber,address: user.address,role: user.role});
        res.cookie("token", token, { httpOnly: true });
        console.log(token);
        // Successful login
        res.status(200).json({
            status: "success",
            message: "Login successful.",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobileNumber: user.mobileNumber,
                address: user.address,
                role: user.role,
                token,
            },
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error." });
    }
}
//Forgot Password

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    const token = generateToken({id: user._id,name: user.name,email: user.email,mobileNumber: user.mobileNumber,address: user.address,role: user.role});
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found." });
    }
    const resetLink = `http://localhost:8854/reset-password/${user._id}/${token}`;
    const emailHtml = `
    <h3>Password Reset Request</h3>
    <p>Click the link below to reset your password:</p>
    <a href="${resetLink}">${resetLink}</a>
  `;

    try {
        await tr.sendMail({
            from: "koundinya2608@gmail.com",
            to: email,
            subject: "Password Reset Request",
            html: emailHtml,
        });

        res.status(200).json({ status: "success", message: "Reset link sent successfully." });
    } catch (error) {
        console.error("Error sending email:", error.message);
        res.status(500).json({ status: "error", message: "Failed to send the email." });
    }
};

// Reset password
export const resetPassword = async (req, res) => {
    const { id, token } = req.params;
    if (!id || !token) {
        return res.status(400).json({ status: "error", message: "Invalid request." });
    }
    console.log("ID:", id);
    console.log("Token:", token);
    const { newPassword } = req.body;
    try {
         jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
            if (err) {
                return res.status(403).json({ status: "error", message: "Invalid or expired token." });
            }
            else {
                const user = await User.findById(id);
                if (!user) {
                    return res.status(404).json({ status: "error", message: "User not found." });
                }
                // await User.updateOne({ email }, { password: newPass });
                user.password = newPassword;
                await user.save();
                res.status(200).json({ status: "success", message: "Password updated successfully." });
            
            }
         });
    }
catch (error) {
    console.error("Error resetting password:", error.message);
    res.status(500).json({ status: "error", message: "Failed to reset password." });
}
};

// // export const forgotPassword = async (req, res) => {
//     const { email } = req.body;

//     try {
//         //console.log("Email:", email);
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ status: "error", message: "User not found." });
//         }
//        /// const OTP = Math.random().toString(36).substring(2, 12);
//         const mailOptions = {
//             from: "koundinya@gmail.com",
//             to: email,
//             subject: "Password Reset",
//             text:`Click the following link to reset your password: http://localhost:8854/reset-password?token=${resetToken}`
//         };
//         await tr.sendMail(mailOptions);
//         console.log(`Password reset link sent to ${email}`);

//         res.status(200).json({
//             status: "success",
//             message:"Password reset link sent successfully.",
//         });
//     } catch (err) {
//         res.status(500).json({ status: "error", message: "Failed to send password reset link.", error: err.message });
//     }
// }
//Email Transporter
const tr = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "koundinya2608@gmail.com",
        pass: "dzeqjiflgnvuwsgc"
    },
});