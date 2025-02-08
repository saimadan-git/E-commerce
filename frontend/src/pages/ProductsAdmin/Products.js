import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import ProductForm from "./ProductForm";
import styles from "./Products.module.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { notifySuccess, notifyError } from "../../utils/toastUtils";

const Products = () => {
    const DUMMY_IMAGE = "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg";
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get("/products/get-products");
            if (response.data.status === "success") {
                setProducts(response.data.data);
                // notifySuccess(response.data.message);
            } else {
                notifyError(response.data.message);
            }
            
        } catch (error) {
            notifyError("Failed to fetch products!");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response = await api.delete(`/products/delete-product/${id}`);
                if (response.data.status === "success") {
                    notifySuccess(response.data.message);
                } else {
                    notifyError(response.data.message);
                }
                setProducts(products.filter((product) => product._id !== id));
            } catch (error) {
                notifyError("Failed to delete product!");
            }
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setShowForm(true);
    };

    return (
        <div className={styles.productsContainer}>
            <h2 className={styles.heading}>Product Management</h2>
            <button className={styles.addButton} onClick={() => setShowForm(true)}>
                <FaPlus /> Add Product
            </button>

            {showForm && (
                <ProductForm
                    product={editingProduct}
                    refreshProducts={fetchProducts}
                    closeForm={() => {
                        setEditingProduct(null);
                        setShowForm(false);
                    }}
                />
            )}

            <div className={styles.productList}>
                {products.map((product) => (
                    <div key={product._id} className={styles.productCard}>
                        <img src={product.image ? product.image : DUMMY_IMAGE} alt={product.name} className={styles.productImage}/>
                        <h3 className={styles.productName}>{product.name}</h3>
                        <p className={styles.description}>{product.description}</p>
                        <p className={styles.detail}><strong>Weight:</strong> {product.weight}g</p>
                        <p className={styles.detail}><strong>Price:</strong> ₹{product.price}</p>
                        
                        {/* New Fields */}
                        <p className={styles.detail}>
                            <strong>Category:</strong> {product.category === "veg" ? "Vegetarian 🌱" : "Non-Vegetarian 🍗"}
                        </p>
                        <p className={styles.detail}>
                            <strong>Availability:</strong> {product.availability ? "✅ In Stock" : "❌ Out of Stock"}
                        </p>

                        <div className={styles.actions}>
                            <button className={styles.editButton} onClick={() => handleEdit(product)}>
                                <FaEdit /> Edit
                            </button>
                            <button className={styles.deleteButton} onClick={() => handleDelete(product._id)}>
                                <FaTrash /> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
