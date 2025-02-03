import React, { useState } from "react";
import api from "../../utils/api.js";
import styles from "./ProductForm.module.css";
import { notifyError, notifySuccess } from "../../utils/toastUtils.js";

const ProductForm = ({ product, refreshProducts, closeForm }) => {
    const [formData, setFormData] = useState({
        name: product?.name || "",
        description: product?.description || "",
        weight: product?.weight || "",
        price: product?.price || "",
        image: null,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Validate Form Fields
    const validateField = (name, value) => {
        let error = "";

        if (name === "name") {
            if (!value) {
                error = "Name is required.";
            }
        } else if (name === "description") {
            if (!value) {
                error = "Description is required.";
            }
        } else if (name === "weight") {
            if (!value) {
                error = "Weight is required.";
            }
        } else if (name === "price") {
            if (!value) {
                error = "Price is required.";
            }
        } else if (name === "image") {
            if (!value) {
                error = "Image is required.";
            }
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update Form Data
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Validate Field and Update Errors
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validateField(name, value),
        }));
    };

    const handleFileChange = (e) => {
        const value = e.target.files[0];
        setFormData((prev) => ({ ...prev, image: value }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            image: validateField('image', value),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true before starting the request

        // Validate All Fields Before Submitting
        const newErrors = {
            name: validateField("name", formData.name),
            description: validateField("description", formData.description),
            weight: validateField("weight", formData.weight),
            price: validateField("price", formData.price),
            image: validateField("image", formData.image),
        };

        setErrors(newErrors);

        // If Any Errors Exist, Don't Submit
        if (Object.values(newErrors).some((error) => error)) return;

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("weight", formData.weight);
        formDataToSend.append("price", formData.price);
        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        try {
            if (product) {
                await api.put(`/products/${product._id}`, formDataToSend);
                notifySuccess("Product updated successfully!");
            } else {
                await api.post("/products/add", formDataToSend);
                notifySuccess("Product added successfully!");
            }
            refreshProducts();
            closeForm();
        } catch (error) {
            notifyError("Failed to save product!");
        } finally {
            setLoading(false); // Set loading to false after the request completes
        }
    };

    return (
        <div>
            {loading ? <div className={styles.loader}></div> : <div className={styles.formOverlay}>
                <div className={styles.formContainer}>
                    <h2>{product ? "Edit Product" : "Add Product"}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <label>Product Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} />
                            {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} />
                            {errors.description && <p className={styles.errorMessage}>{errors.description}</p>}
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Weight (g)</label>
                            <input type="number" name="weight" value={formData.weight} onChange={handleChange} />
                            {errors.weight && <p className={styles.errorMessage}>{errors.weight}</p>}
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Price (₹)</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} />
                            {errors.price && <p className={styles.errorMessage}>{errors.price}</p>}
                        </div>

                        <div className={styles.fileInput}>
                            <label>Product Image</label>
                            <input type="file" name="image" onChange={handleFileChange} accept="image/*" />
                            {errors.image && <p className={styles.errorMessage}>{errors.image}</p>}
                        </div>

                        <div className={styles.buttonGroup}>
                            <button type="submit" className={styles.submitButton}>
                                {product ? "Update" : "Add"}
                            </button>
                            <button type="button" onClick={closeForm} className={styles.cancelButton}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>}
        </div>

    );
};

export default ProductForm;