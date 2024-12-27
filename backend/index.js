import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './Register.js';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

//Email Transporter
const tr = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "koundinya2608@gmail.com",
    pass: "dzeqjiflgnvuwsgc"
  },
});

// Routes
// --------------------------------------------Register----------------------------------------------
app.post('/register', async (req, res) => {
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
});
//---------------------------------------------Login-------------------------------------------------
app.post("/login", async (req, res) => {
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
});
//--------------------------------------------Forgot Password----------------------------------------
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    //console.log("Email:", email);
    const user = await user.findOne({ email });
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
});

tr.verify((error, success) => {
  if (error) {
    console.error("Transporter verification failed:", error);
  } else {
    console.log("Transporter is ready to send emails:", success);
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

});
