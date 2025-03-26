import mongoose from "mongoose";
import moment from 'moment-timezone';
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
      quantity: { type: Number, required: true },
    }
  ],
  orderId: { type: String, required: true },
  orderDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date, default: moment().tz("Asia/Kolkata").toDate() },
  status: { type: String, default: 'Order Not Placed' ,
  },
  paymentStatus: { type: String, default: 'Pending' },
  amount: { type: Number, required: true },
  paymentId: { type: String },
  });
export default mongoose.model("Order", orderSchema);