import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   weight: { type: Number, required: true },
//   image: { type: String},
//   category: { type: String, required: true },
//   availability: { type: Boolean, default:true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true},
            selectedWeight: { type: Number, required: true },
            price: { type: Number, required: true }
        },
    ],
    totalPrice: { type: Number, required: true }
});
export default mongoose.model("Cart", cartSchema);