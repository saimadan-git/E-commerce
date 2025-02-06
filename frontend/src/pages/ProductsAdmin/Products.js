import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import ProductForm from "./ProductForm";
import styles from "./Products.module.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { notifySuccess, notifyError } from "../../utils/toastUtils";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get("/products/get-products");
            setProducts(response.data.data);
        } catch (error) {
            notifyError("Failed to fetch products!");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await api.delete(`/products/delete-product/${id}`);
                setProducts(products.filter((product) => product._id !== id));
                notifySuccess("Product deleted successfully!");
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
            <h2>Product Management</h2>
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
                        <img src={product.image} alt={product.name} className={styles.productImage}/>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p><strong>Weight:</strong> {product.weight}g</p>
                        <p><strong>Price:</strong> ₹{product.price}</p>
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
