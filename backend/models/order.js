import mongoose from "mongoose";
import moment from 'moment-timezone';
import { type } from "os";
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      selectedWeight: { type: Number, required: true },
    }
  ],
  orderId: { type: String, required: true },
  orderDate: { type: Date, default: Date.now },
  // deliveryDate: { 
  //   type: Date, 
  //   default: () => moment().tz("Asia/Kolkata").toDate(),
  // },
  //   status: { type: String, default: 'Order Not Placed' ,
  // },
  paymentStatus: { type: String, default: 'Pending' },
  amount: { type: Number, required: true },
  paymentId: { type: String },
  selectedAddress: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    type: { type: String, required: true },
    customType:{ type: String, default: null },
  },
  });
export default mongoose.model("Order", orderSchema);