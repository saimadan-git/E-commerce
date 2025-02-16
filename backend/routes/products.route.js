import express from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct, getProductById, getRelatedProducts } from '../controller/products.controller.js';
import verifyAdmin from '../middlewares/Admin.js';
import upload from '../utils/multerConfig.js';
const router = express.Router();
//Create a new Product
router.post('/create-product', upload.single("image"), verifyAdmin, createProduct);
//Get all Products
router.get("/get-products", getProducts);
//Get product by ID
router.get("/get-product/:productId", getProductById);
//Update product by ID
router.put("/update-product/:productId", upload.single('image'), verifyAdmin, updateProduct);
//Delete product by ID
router.delete("/delete-product/:productId", verifyAdmin, deleteProduct);
//Get related products
router.get("/related-products/:productId", getRelatedProducts);
export default router;