import express from 'express';
import { createProduct,getProducts,updateProduct, deleteProduct } from '../controller/products.controller.js';
import verifyAdmin from '../middlewares/Admin.js';

const router = express.Router();
//Create a new product
router.post('/create-product',verifyAdmin, createProduct);
//Get all Products
router.get("/get-products", getProducts);
//Get product by ID
router.get("/get-product/:productId", getProducts);
//Update product by ID
router.put("/update-product/:productId",verifyAdmin, updateProduct);
//Delete product by ID
router.delete("/delete-product/:productId",verifyAdmin, deleteProduct);
export default router;