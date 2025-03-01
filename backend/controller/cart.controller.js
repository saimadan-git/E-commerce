import Cart from "../models/cart.js";
import products from "../models/products.js";
//To add items to the cart
//1.Adding of items to the cart.
export const addCart = async (req, res) => {
    try {
        console.log(req.body);
        const {userId,productId, quantity, selectedWeight } = req.body;
        const product = await products.findById(productId);
        if (!product) {
            return res.status(404).json({
                status: "error",
                message: "Product not found"
            });
        }
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({
                userId: userId,
                cartItems: [{ productId: productId, quantity, selectedWeight , price: product.price * quantity }],//Weight should be variable
                totalPrice: product.price * quantity,// Add the same product with different weight
            });
        } else {
            // Check if the product already exists in the cart
            const existingItem = cart.cartItems.find(item => item.productId.toString() === productId);

            if (existingItem) {
                existingItem.quantity += quantity;  // Update quantity
                existingItem.price = product.price * existingItem.quantity;  // Update price
            } else {
                cart.cartItems.push({
                    productId,
                    quantity,
                    selectedWeight,
                    price: product.price * quantity
                });
            }

            // Update total price
            cart.totalPrice = cart.cartItems.reduce((total, item) => total + item.price, 0);
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
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ 
                status: "error",
                message: "Cart not found" });
        }
        if (cart.cartItems.length === 0) {
            return res.status(200).json({
                status: "success",
                message: "Cart is empty",
            });
        }
        res.status(200).json(cart); //Also need product details
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            error: error.message
        });
    }
}
//3.Update the cart with the quantity and weight of the product.
// export const updateCart = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const { productId } = req.params;
//         const { quantity } = req.body;
//         const product = await products.findById(productId);
//         if (!product) {
//             return res.status(404).json({
//                 status: "error",
//                 message: "Product not found"
//             });
//         }
//         const cart = await cart.findOne({ user: userId });
//         if (!cart) {
//             return res.status(404).json({
//                 status: "error",
//                 message: "Cart not found"
//             });
//         }
//         const itemIndex = cart.cartItems.findIndex((item) => item.product == productId);
//         if (itemIndex > -1) {
//             cart.cartItems[itemIndex].quantity += quantity;
//             cart.cartItems[itemIndex].price += quantity * product.price;
//             cart.totalPrice += quantity * product.price;
//             await cart.save();
//             return res.status(200).json({
//                 status: "success",
//                 message: "Cart updated"
//             });
//         }
//     } catch (error) {
//         res.status(500).json({
//             status: "error",
//             message: "Internal Server Error",
//             error: error.message
//         });
//     }
// }
//4.Remove items from the cart. remove whole item
export const removeItem = async (req, res) => {
    try {
        const { userId,productId } = req.params;
        console.log(req.body); 
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                status: "error",
                message: "Cart not found"
            });
        }
        const itemIndex = cart.cartItems.findIndex((item) => item.productId == productId);
        if (itemIndex === -1) {
            return res.status(404).json({
                status: "error",
                message: "Item not found in cart"
            });
        }
        cart.cartItems[itemIndex].quantity -= 1;
        if (cart.cartItems[itemIndex].quantity <= 0) {
            cart.cartItems.splice(itemIndex, 1);
        }
        cart.totalPrice = cart.cartItems.reduce((total, item) => total + item.price, 0);
        cart.save();
        return res.status(200).json({
            status: "success",
            message: "Item removed from cart"
        });
    } catch (error) {
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