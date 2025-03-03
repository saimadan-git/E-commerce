import mongoose from 'mongoose';
const cartItemsSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
    quantity: { type: Number, required: true, default: 1 },
    selectedWeight: { type: Number, required: true },
    price: { type: Number, required: true },
    });
const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    cartItems: [cartItemsSchema],
    totalPrice: { type: Number, required: true },
    });
export default mongoose.model('Cart', cartSchema);