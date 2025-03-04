import express from 'express';
import {addCart,getCart,updateCart,removeItem,clearCart} from '../controller/cart.controller.js';
const router = express.Router();
//Add to cart.
router.post('/addToCart', addCart);
//Get cart
router.get('/getCart/:userId', getCart);
//Update cart
router.put('/updateCart/:userId/:itemId', updateCart);
//Remove item from cart
router.delete('/removeItem/:userId/:itemId', removeItem);
//Clear cart
router.delete('/clearCart/:userId', clearCart);
export default router;