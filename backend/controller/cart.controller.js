import express from "express";
import Cart from "../models/cart.js";
import products from "../models/products.js";
//To add items to the cart
//1.Adding of items to the cart.
export const addCart = async (req, res) => {
    try {
        console.log(req.body);
        const { userId, productId, quantity, selectedWeight } = req.body;
        const product = await products.findById(productId);
        if (!product) {
            return res.status(404).json({
                status: "error",
                message: "Product not found"
            });
        }
        const basePrice = product.price;
        const baseWeight = product.weight || 1000;
        const calculatePrice = (basePrice / baseWeight) * selectedWeight * quantity;
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({
                userId: userId,
                cartItems: [{ productId: productId, quantity, selectedWeight, price: calculatePrice }],//Weight should be variable
                totalPrice: calculatePrice,// Add the same product with different weight
            });
        } else {
            // Check if the product already exists in the cart
            const existingItem = cart.cartItems.find(item => item.productId.toString() === productId && item.selectedWeight === selectedWeight);
            if (existingItem) {
                existingItem.quantity += quantity;  // Update quantity
                // Update price
                existingItem.price += calculatePrice;
            } else {
                cart.cartItems.push({
                    productId,
                    quantity,
                    selectedWeight,
                    price: calculatePrice
                });
            }

            // Update total price
            cart.totalPrice += calculatePrice;
        }
        await cart.save();
        return res.status(201).json({
            status: "success",
            message: "Product added to cart",
            data: cart
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: error.message
        });
    }
}
//2.Retrieve the cart when the user logs in.
export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId }).populate({
            path: "cartItems.productId",
            model: "product",
            select: "_id name image"

        });
        if (!cart) {
            return res.status(404).json({
                status: "error",
                message: "Cart not found"
            });
        }
        if (cart.cartItems.length === 0) {
            return res.status(200).json({
                status: "success",
                message: "Cart is empty"
            });
        }
        const formattedCart = {
            _id: cart._id,
            userId: cart.userId,
            cartItems: cart.cartItems.map(item => ({
                productId: {
                    _id: item.productId._id,
                    name: item.productId.name,
                    image: item.productId.image || null // Handle cases where no image exists
                },
                quantity: item.quantity,
                selectedWeight: item.selectedWeight,
                price: item.price,
                _id: item._id
            })),
            totalPrice: cart.totalPrice,
            __v: cart.__v
        };

        return res.status(200).json({
            status: "error",
            message: "Cart retrieved successfully",
            data: formattedCart
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: error.message
        });
    }
}
//3.Update the cart, increase or decrease the quantity of the product on the cart page itself.
export const updateCart = async (req, res) => {
    try {
        const { userId, itemId } = req.params;
        const { quantity } = req.body;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                status: "error",
                message: "Cart not found"
            });
        }
        const cartItem = cart.cartItems.find(item => item._id.toString() === itemId);
        // console.log("cart",cart);
        // console.log("weight",selectedWeight);
        // console.log(productId);
        // console.log(typeof cart.cartItems[0].productId);
        if (!cartItem) {
            return res.status(404).json({
                status: "error",
                message: "Product not found in cart"
            });
        }
        const product = await products.findById(cartItem.productId);
        if (!product) {
            return res.status(404).json({
                status: "error",
                message: "Product not found"
            });
        }
        const basePrice = product.price;
        const baseWeight = product.weight;
        const calculatePrice = (basePrice / baseWeight) * cartItem.selectedWeight * quantity;
        cartItem.quantity = quantity;
        cartItem.price = calculatePrice;
        // Update total price
        cart.totalPrice = cart.cartItems.reduce((total, item) => total + item.price, 0);
        await cart.save();
        return res.status(200).json({
            status: "success",
            message: "Cart updated successfully",
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: error.message
        });
    }
};
//4.Remove Whole item from the cart.
export const removeItem = async (req, res) => {
    try {
        const { userId, itemId } = req.params;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                status: "error",
                message: "Cart not found"
            });
        }
        const cartItem = cart.cartItems.find(item => item._id.toString() === itemId);
        if (!cartItem) {
            return res.status(404).json({
                status: "error",
                message: "Product not found in cart"
            });
        }
        cart.cartItems = cart.cartItems.filter(item => item._id.toString() !== itemId);
        cart.totalPrice = cart.cartItems.reduce((total, item) => total + item.price, 0);
        await cart.save();
        return res.status(200).json({
            status: "success",
            message: "Item removed from cart",
            data: cart
        });
    }catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: error.message
        });
    }
}
//5.Clear the cart.
export const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                status: "error",
                message: "Cart not found"
            });
        }
        cart.cartItems = [];
        cart.totalPrice = 0;
        await cart.save();
        return res.status(200).json({
            status: "success",
            message: "Cart cleared"
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: error.message
        });
    }
}
