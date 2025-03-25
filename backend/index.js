import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';
import productsRoute from './routes/products.route.js';
import cartRoute from './routes/cart.route.js';
import addressRoute from './routes/address.route.js';
import passport from "./utils/Passport.js";
import orderRoute from './routes/order.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

//Routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/products", productsRoute);
app.use("/cart", cartRoute);
app.use("/address", addressRoute);
app.use("/order", orderRoute);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));
/////
// tr.verify((error, success) => {
//   if (error) {
//     console.error("Transporter verification failed:", error);
//   } else {
//     console.log("Transporter is ready to send emails:", success);
//   }
// });


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});