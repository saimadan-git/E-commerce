import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  weight: { type: Number, required: true },
  image: { type: String},
  category: { type: String, required: true },
  availability: { type: Boolean, default:true},
});
export default mongoose.model("product", productSchema);