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
        category: product?.category || "veg",
        availability: product?.availability ?? true,
        image: null,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Validate Form Fields
    const validateField = (name, value) => {
        let error = "";

        switch (name) {
            case "name":
                if (!value) error = "Name is required.";
                break;
            case "description":
                if (!value) error = "Description is required.";
                break;
            case "weight":
                if (!value) error = "Weight is required.";
                break;
            case "price":
                if (!value) error = "Price is required.";
                break;
            case "image":
                if (!product && !value) error = "Image is required.";
                break;
            default:
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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
            image: validateField("image", value),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {
            name: validateField("name", formData.name),
            description: validateField("description", formData.description),
            weight: validateField("weight", formData.weight),
            price: validateField("price", formData.price),
            image: validateField("image", formData.image),
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some((error) => error)) return;

        setLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("weight", formData.weight);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("availability", formData.availability);
        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        try {
            if (product) {
                const response = await api.put(`/products/update-product/${product._id}`, formDataToSend);
                if (response.data.status === "success") {
                    notifySuccess(response.data.message);
                } else {
                    notifyError(response.data.message);
                }
            } else {
                const response = await api.post("/products/create-product", formDataToSend);
                if (response.data.status === "success") {
                    notifySuccess(response.data.message);
                } else {
                    notifyError(response.data.message);
                }
            }
            refreshProducts();
            closeForm();
        } catch (error) {
            notifyError("Failed to save product!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.formOverlay}>
            <div className={styles.formContainer}>
                <h2>{product ? "Edit Product" : "Add Product"}</h2>
                <form onSubmit={handleSubmit} className={styles.formGrid}>
                    {/* Product Name */}
                    <div className={styles.inputGroup}>
                        <label>Product Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                        {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
                    </div>

                    {/* Price */}
                    <div className={styles.inputGroup}>
                        <label>Price (₹)</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} />
                        {errors.price && <p className={styles.errorMessage}>{errors.price}</p>}
                    </div>

                    {/* Description (Full width) */}
                    <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} />
                        {errors.description && <p className={styles.errorMessage}>{errors.description}</p>}
                    </div>

                    {/* Weight */}
                    <div className={styles.inputGroup}>
                        <label>Weight (g)</label>
                        <input type="number" name="weight" value={formData.weight} onChange={handleChange} />
                        {errors.weight && <p className={styles.errorMessage}>{errors.weight}</p>}
                    </div>

                    {/* Category */}
                    <div className={styles.inputGroup}>
                        <label>Category</label>
                        <select name="category" value={formData.category} onChange={handleChange}>
                            <option value="veg">Veg</option>
                            <option value="non-veg">Non-Veg</option>
                        </select>
                        {errors.category && <p className={styles.errorMessage}>{errors.category}</p>}
                    </div>

                    {/* Availability (Radio Buttons) */}
                    <div className={styles.inputGroup}>
                        <label>Availability</label>
                        <div className={styles.radioGroup}>
                            <label>
                                <input
                                    type="radio"
                                    name="availability"
                                    value="true"
                                    checked={formData.availability === true}
                                    onChange={() => setFormData((prev) => ({ ...prev, availability: true }))}
                                />
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="availability"
                                    value="false"
                                    checked={formData.availability === false}
                                    onChange={() => setFormData((prev) => ({ ...prev, availability: false }))}
                                />
                                No
                            </label>
                        </div>
                        {errors.availability && <p className={styles.errorMessage}>{errors.availability}</p>}
                    </div>

                    {/* Image Upload (Full width) */}
                    <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                        <label>Product Image</label>
                        <input type="file" name="image" onChange={handleFileChange} accept="image/*" />
                        {errors.image && <p className={styles.errorMessage}>{errors.image}</p>}
                    </div>

                    {/* Buttons (Full width) */}
                    <div className={`${styles.buttonGroup} ${styles.fullWidth}`}>
                        <button type="submit" className={styles.submitButton}>
                            {loading ? <div className={styles.loader}></div> : product ? "Update" : "Add"}
                        </button>
                        <button type="button" onClick={closeForm} className={styles.cancelButton}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
