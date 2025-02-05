import express from 'express';
import { createProduct,getProducts,updateProduct } from '../controller/products.controller.js';

const router = express.Router();
//Create a new product
router.post('/create-product', createProduct);
//Get all Products
router.get("/get-products", getProducts);
//Get product by ID
router.get("/get-product/:productId", getProducts);
//Update product by ID
router.put("/update-product/:productId", updateProduct);
export default router;