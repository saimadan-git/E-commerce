import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
      quantity: { type: Number, required: true },
    }
  ],
  orderDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Order Not Placed' },
  paymentStatus: { type: String, default: 'Pending' },
  amount: { type: Number, required: true },
  paymentId: { type: String },
  });
export default mongoose.model("Order", orderSchema);