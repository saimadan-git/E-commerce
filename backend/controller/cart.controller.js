//To add items to the cart
//1.Retrieve the cart when the user logs in.
//2.Adding of items to the cart.
//3.If any item exists in the cart, need to increse the quantity of the item.
//4.If the item does not exist in the cart, need to add the item to the cart.
//5.Optionally remove items from the cart.

import Cart from "../models/Cart.js";
import Product from "../models/products.js";
import { createError, createSuccess } from "../utils/responseHandler.js";

export const addToCart = async (req, res) => {
    const { userId, productId, quantity, selectedWeight } = req.body;

    if (!userId || !productId || !quantity || !selectedWeight) {
        return res.status(400).json(createError("Required fields are missing"));
    }

    try {
        // Fetch product with lean() for better performance
        const product = await Product.findById(productId).lean();
        if (!product) {
            return res.status(404).json(createError("Product not found"));
        }

        // Correct price calculation (ensuring it's a number)
        const price = parseFloat(((product.price / product.weight) * selectedWeight * quantity).toFixed(2));

        // Fetch or create cart
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [{ productId, quantity, selectedWeight, price }],
                totalPrice: price
            });
            await cart.save();
            return res.status(201).json(createSuccess("Product added to cart successfully", cart));
        }

        // Find index of existing product with the same weight
        const existingIndex = cart.items.findIndex(item => item.productId == productId && item.selectedWeight == selectedWeight);

        if (existingIndex !== -1) {
            // Update existing item quantity and recalculate price
            cart.items[existingIndex].quantity += parseInt(quantity);
            cart.items[existingIndex].price = parseFloat(((product.price / product.weight) * cart.items[existingIndex].selectedWeight * cart.items[existingIndex].quantity).toFixed(2));
        } else {
            // Add new item
            cart.items.push({ productId, quantity, selectedWeight, price });
        }

        // Recalculate total price
        cart.totalPrice = cart.items.reduce((acc, item) => acc + parseFloat(item.price), 0);

        await cart.save();
        return res.status(201).json(createSuccess("Product added to cart successfully", cart));
    } catch (err) {
        res.status(500).json(createError(err.message));
    }
};

/**
 * Retrieves the cart details for a specific user.
 */
export const getCart = async (req, res) => {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json(createError("User ID is required"));
    }
    try {
        const cart = await Cart.findOne({ userId }).populate("items.productId", "name image");
        if (!cart) {
            return res.status(404).json(createError("Cart not found"));
        }
        res.status(200).json(createSuccess("Cart retrieved successfully", cart));
    } catch (err) {
        res.status(500).json(createError(err.message));
    }
}

export const updateCart = async (req, res) => {
    const {userId, productId, quantity, selectedWeight} = req.body;
    if (!userId || !productId || !quantity || !selectedWeight) {
        return res.status(400).json(createError("Required fields are missing"));
    }
    try {
        const product = await Product
            .findById(productId)
            .lean();
        if (!product) {
            return res.status(404).json(createError("Product not found"));
        }
        let cart = await Cart.findOne({userId});
        if (!cart) {
            return res.status(404).json(createError("Cart not found"));
        }
        const existingIndex = cart.items.findIndex(item => item.productId == productId && item.selectedWeight == selectedWeight);
        if (existingIndex !== -1) {
            cart.items[existingIndex].quantity = parseInt(quantity);
            cart.items[existingIndex].price = parseFloat(((product.price / product.weight) * cart.items[existingIndex].selectedWeight * cart.items[existingIndex].quantity).toFixed(2));
        }
        cart.totalPrice = cart.items.reduce((acc, item) => acc + parseFloat(item.price), 0);
        await cart.save();
        res.status(200).json(createSuccess("Cart updated successfully", cart));
    } catch (err) {
        res.status(500).json(createError(err.message));
    }
}

export const removeItemFromCart = async (req, res) => {
    const { productId } = req.params;
    const { userId, selectedWeight } = req.query;
    console.log(productId, userId, selectedWeight);
    if (!userId || !productId || !selectedWeight) {
        return res.status(400).json(createError("Required fields are missing"));
    }
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json(createError("Cart not found"));
        }
        console.log(cart);
        const itemIndex = cart.items.findIndex(item => item.productId == productId && item.selectedWeight == selectedWeight);
        if (itemIndex === -1) {
            return res.status(404).json(createError("Item not found in cart"));
        }
        
        cart.items.splice(itemIndex, 1);
        cart.totalPrice = cart.items.reduce((acc, item) => acc + parseFloat(item.price), 0);
        
        await cart.save();
        res.status(200).json(createSuccess("Item removed successfully", cart));
    } catch (err) {
        res.status(500).json(createError(err.message));
    }
};
