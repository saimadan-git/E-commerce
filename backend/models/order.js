import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
  orderDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Order Placed' },
  totalPrice: { type: Number, required: true },
  });
export default mongoose.model("Order", orderSchema);
