import User from '../models/Register.js';
import nodemailer from 'nodemailer';
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
        const newUser = new User({
            name,
            email,
            mobileNumber,
            password,
        });
        const savedUser = await newUser.save();
        res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: {
                name: savedUser.name,
                email: savedUser.email,
                mobileNumber: savedUser.mobileNumber,
                password: savedUser.password,
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

        // Successful login
        res.status(200).json({
            status: "success",
            message: "Login successful.",
            data: {
                name: user.name,
                email: user.email
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

    try {
        //console.log("Email:", email);
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found." });
        }
        const OTP = Math.random().toString(36).substring(2, 12);
        const mailOptions = {
            from: "koundinya@gmail.com",
            to: email,
            subject: "Password Reset",
            text: `Your OTP to Reset Password is: ${OTP}`
        };
        await tr.sendMail(mailOptions);
        console.log(`Reset OTP for ${email}: ${OTP}`);

        res.status(200).json({
            status: "success",
            message: "Password reset OTP sent successfully.",
        });
    } catch (err) {
        res.status(500).json({ status: "error", message: "Failed to send OTP.", error: err.message });
    }
}
//Email Transporter
const tr = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "koundinya2608@gmail.com",
        pass: "dzeqjiflgnvuwsgc"
    },
});