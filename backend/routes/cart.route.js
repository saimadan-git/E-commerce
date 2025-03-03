import express from 'express';
import { addToCart, getCart, removeItemFromCart, updateCart } from '../controller/cart.controller.js';

const router = express.Router();

router.get('/:userId', getCart);
router.post('/add', addToCart);
router.put('/update', updateCart);
router.delete('/remove/:productId', removeItemFromCart)

export default router;