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
  console.log("Mahi is Smart")
  const { name, email, mobileNumber, password } = req.body;

  try {
    // const randomCustomerId = Math.floor(1000000000000 + Math.random() * 9000000000000).toString();

    // Create a new user
    const newUser = new User({
      // title,
      // customerName,
      name,
      email,
      // countryCode,
      mobileNumber,
      // userId,
      password,
      // customerId: randomCustomerId,
    });

    await newUser.save();
    console.log(newUser);
    res.status(201).json({
      message: 'User Registration Successful!',
      // customerId: randomCustomerId,
      // customerName,
      // email,
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (password != user.password) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Successful login
    res.status(200).json({
      message: "Login successful.",
      user: {
        customerName: user.customerName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});