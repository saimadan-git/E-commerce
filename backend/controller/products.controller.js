import Product from "../models/products.js";
import path from "path";
//Create Product
export const createProduct = async (req, res) => {
    try {
        const { name, price, weight, description, category, availability } = req.body;
        const image = req.file.path;
        // console.log(req.body);
        // console.log(req.file);

        // if (!req.file) {
        //     return res.status(400).json({
        //         status: "error",
        //         message: "Image file is required!",
        //     });
        // }
        // console.log(image);
        const productExists = await Product.findOne({ name });
        if (productExists) {
            return res.status(400).json({
                status: "error",
                message: "Product already exists",
            });
        }
        const product = new Product({
            name,
            price,
            description,
            weight,
            category,
            availability,
            image
        });
        const savedProduct = await product.save();
        res.status(201).json({
            status: "success",
            message: "Product created successfully",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: err.message,
        });
    }
};

//Get All Products
export const getProducts = async (req, res) => {

    try {
        const allProducts = await Product.find();
        res.status(200).json({
            status: "success",
            message: "All products",
            data: allProducts,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: err.message,
        });
    }
}

//Get Product by ID
export const getProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                status: "error",
                messege: "Product not found",

            });
        }
        res.status(200).json({
            status: "success",
            messege: "Product Found",
            data: product
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            messege: "Internal Server Error",
            error: err.messege
        });
    }
}

//Update Product
export const updateProduct = async (req, res) => {
    const { name, price, weight, description, category, availability } = req.body;
    const { productId } = req.params;
    try {
        const updatedData = {
            name,
            price,
            description,
            weight,
            category,
            availability,
        };

        if (req.file) {
            updatedData.image = req.file.path;
        }

        const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({
                status: "error",
                message: "Product not found",
                data: {}
            });
        }
        res.status(200).json({
            status: "success",
            message: "Product updated successfully",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: err.message
        });
    }
}

//Delete Product
export const deleteProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({
                status: "error",
                message: "Product not found",
            });
        }
        res.status(200).json({
            status: "success",
            message: "Product deleted successfully",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: err.message
        });
    }
}
//Related Products by Category
export const getRelatedProducts = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        const relatedProducts = await Product.find({ category: product.category });
        res.status(200).json({
            status: "success",
            message: "Related Products",
            data: relatedProducts
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Internal server error",
            error: err.message
        });
    }
}