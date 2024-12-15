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

    // await newUser.save();
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

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
