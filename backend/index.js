import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './Register.js';

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

// Routes
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
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
        data: { }
      });
    }
    if (password != user.password) {
      return res.status(401).json({status: "error", message: "Invalid credentials.", data: {} });
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
app.get("/welcome", async (req, res) => {
  res.send("WElcome");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

});
