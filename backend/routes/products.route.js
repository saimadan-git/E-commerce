import express from 'express';
import { createProduct,getProducts,updateProduct, deleteProduct } from '../controller/products.controller.js';
import upload from '../utils/multerConfig.js';

const router = express.Router();
//Create a new product
router.post('/create-product', upload.single("image"), createProduct);
//Get all Products
router.get("/get-products", getProducts);
//Get product by ID
router.get("/get-product/:productId", getProducts);
//Update product by ID
router.put("/update-product/:productId", updateProduct);
//Delete product by ID
router.delete("/delete-product/:productId", deleteProduct);
export default router;