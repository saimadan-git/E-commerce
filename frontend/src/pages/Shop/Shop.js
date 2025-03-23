import React, { useContext, useEffect, useState } from "react";
import api from "../../utils/api";
import Loader from "../../components/Loader";
import styles from "./Shop.module.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext.js";
import { notifyError, notifySuccess } from "../../utils/toastUtils";


const Shop = () => {
    const DUMMY_IMAGE = "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg";
    const VEG_ICON = "https://img.icons8.com/color/48/000000/vegetarian-food-symbol.png";
    const NON_VEG_ICON = "https://img.icons8.com/color/48/000000/non-vegetarian-food-symbol.png";
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [priceRanges, setPriceRanges] = useState(new Set());
    const [loading, setLoading] = useState(true);
    

    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get("/products/get-products");
            setProducts(response.data.data);
            setFilteredProducts(response.data.data);
        } catch (error) {
            console.error("Failed to fetch products!");
        } finally {
            setLoading(false);
        }
    };

    const handlePriceRangeChange = (value) => {
        const updatedRanges = new Set(priceRanges);
        if (updatedRanges.has(value)) {
            updatedRanges.delete(value);
        } else {
            updatedRanges.add(value);
        }
        setPriceRanges(updatedRanges);
    };

    const applyFilters = () => {
        let filtered = [...products];

        if (search) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category) {
            filtered = filtered.filter(product => product.category === category);
        }

        if (priceRanges.size > 0) {
            filtered = filtered.filter(product => {
                return [...priceRanges].some(range => {
                    switch (range) {
                        case "less-300":
                            return product.price < 300;
                        case "300-600":
                            return product.price >= 300 && product.price <= 600;
                        case "600-1000":
                            return product.price > 600 && product.price <= 1000;
                        case "1000-1500":
                            return product.price > 1000 && product.price <= 1500;
                        case "more-1500":
                            return product.price > 1500;
                        default:
                            return true;
                    }
                });
            });
        }

        if (sortOrder === "low-to-high") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "high-to-low") {
            filtered.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [search, category, sortOrder, priceRanges, products]);

    const handleAddToCart = async (event, product) => {
        event.stopPropagation();
        const USER_ID = user?.id;
        if (!USER_ID) {
            notifyError("Please login to add products to cart.");
            return
        }
        if(product.availability){
            try {
                const response = await api.post("/cart/addToCart", {
                    userId: USER_ID,
                    productId: product._id,
                    quantity: 1,
                    selectedWeight: product.weight
                });
                
                if (response.data.status === 'success') {
                    notifySuccess(response.data.message);
                    navigate("/cart");  // Navigate to Cart Page
                } else {
                    notifyError(response.data.message);
                }
            } catch (error) {
                notifyError("Error adding product to cart. Please try again.");
            }
        }
    }

    return (
        <div className={styles.shopContainer}>
            {/* Sidebar for Filters */}
            <div className={styles.sidebar}>
                <h3>Filters</h3>

                {/* Category Filter */}
                <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Category</label>
                    <select
                        className={styles.filterSelect}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="veg">Veg</option>
                        <option value="non-veg">Non-Veg</option>
                    </select>
                </div>

                {/* Price Range Filter */}
                <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Price Range</label>
                    <div className={styles.priceOptions}>
                        {[
                            { label: "Less than ₹300", value: "less-300" },
                            { label: "₹300 - ₹600", value: "300-600" },
                            { label: "₹600 - ₹1000", value: "600-1000" },
                            { label: "₹1000 - ₹1500", value: "1000-1500" },
                            { label: "More than ₹1500", value: "more-1500" },
                        ].map(option => (
                            <label key={option.value} className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={priceRanges.has(option.value)}
                                    onChange={() => handlePriceRangeChange(option.value)}
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Sort by Price */}
                <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>Sort by Price</label>
                    <select
                        className={styles.filterSelect}
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="">None</option>
                        <option value="low-to-high">Low to High</option>
                        <option value="high-to-low">High to Low</option>
                    </select>
                </div>
            </div>

            {/* Product Section */}
            <div className={styles.productSection}>
                {/* <h2 className={styles.pageTitle}>Shop Our Products</h2> */}
                {/* Search Field Above Products */}
                <div className={styles.headerRow}>
                    <h2 className={styles.pageTitle}>Find Your Perfect Pick – Explore Our Collection</h2>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {loading ? <Loader /> : null}


                {(filteredProducts.length === 0 && !loading) && <p className={styles.noProducts}>No products available!</p>} 
                {/* Products Grid */}
                <div className={styles.productGrid}>
                    {filteredProducts.length > 0 && (
                        filteredProducts.map((product) => (
                            <div onClick={() => navigate(`/product/${product._id}`)} key={product._id} className={styles.productCard}>
                                {/* Product Image - Full Width */}
                                <img
                                    src={product.image || DUMMY_IMAGE}
                                    alt={product.name}
                                    className={styles.productImage}
                                />

                                {/* Product Details Section */}
                                <div className={styles.productInfo}>
                                    {/* Left Side - Weight and Category */}
                                    <div className={styles.productMeta}>
                                        <p className={styles.productWeight}>{product.weight}g</p>
                                        <img
                                            src={product.category === "veg" ? VEG_ICON : NON_VEG_ICON}
                                            alt={product.category}
                                            className={styles.categoryIcon}
                                        />
                                    </div>

                                    {/* Product Name */}
                                    <p className={styles.productName}>{product.name}</p>

                                    {/* Product Description (Limited to 2 lines) */}
                                    <p className={styles.productDescription}>
                                        {product.description.length > 100
                                            ? `${product.description.substring(0, 100)}...`
                                            : product.description}
                                    </p>

                                    {/* Price and Stock Status */}
                                    <div className={styles.priceStock}>
                                        <p className={styles.productPrice}>₹{product.price}</p>
                                        <span
                                            className={product.availability ? styles.inStock : styles.outOfStock}
                                        >
                                            {product.availability ? "In Stock" : "Out of Stock"}
                                        </span>
                                    </div>

                                    {/* Buttons - Disabled if Out of Stock */}
                                    <div className={styles.buttonGroup}>
                                        <button
                                            className={styles.addToCartButton}
                                            disabled={!product.availability}
                                            onClick={(e) => handleAddToCart(e, product)}
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            className={styles.buyNowButton}
                                            disabled={!product.availability}
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>

                        ))
                    ) 
                    }
                </div>
            </div>
        </div>
    );
};

export default Shop;
