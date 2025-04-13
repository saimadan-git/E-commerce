import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import styles from "./ProductDetails.module.css";
import { FaCheckCircle, FaShippingFast, FaTag, FaPlus, FaMinus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { notifyError, notifySuccess } from "../../utils/toastUtils";
import AuthContext from "../../context/AuthContext.js";

const weightOptions = [
    { label: "250g", value: 250 },
    { label: "500g", value: 500 },
    { label: "1kg", value: 1000 },
];

const ProductDetails = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [selectedWeight, setSelectedWeight] = useState(250);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const relatedRef = useRef(null);
    const [showScrollButtons, setShowScrollButtons] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    useEffect(() => {
        if (product) {
            setPrice(calculatePrice(product.price, product.weight, selectedWeight));
            fetchRelatedProducts(product.category);
        }
    }, [product, selectedWeight]);

    // Function to check if scrolling is needed
    const checkOverflow = () => {
        if (relatedRef.current) {
            const isOverflowing =
                relatedRef.current.scrollWidth > relatedRef.current.clientWidth;
            setShowScrollButtons(isOverflowing);
        }
    };

    useEffect(() => {
        checkOverflow(); // Run on mount
        window.addEventListener("resize", checkOverflow);
        return () => window.removeEventListener("resize", checkOverflow);
    }, [relatedProducts]); // Runs whenever relatedProducts change

    const scrollRelated = (direction) => {
        if (relatedRef.current) {
            const scrollAmount = 200; // Adjust scrolling distance
            relatedRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    const fetchProduct = async () => {
        try {
            const response = await api.get(`/products/get-product/${productId}`);
            setProduct(response.data.data);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };

    const fetchRelatedProducts = async (category) => {
        try {
            // const response = await api.get(`/products/get-products`);
            const response = await api.get(`/products/related-products/${productId}`);
            setRelatedProducts(response.data.data.filter(p => p._id !== productId));
        } catch (error) {
            console.error("Error fetching related products:", error);
        }
    };

    const calculatePrice = (price, weight, selectedWeight) => {
        const pricePerGram = price / weight;
        return pricePerGram * selectedWeight;
    };

    const handleQuantityChange = (type) => {
        setQuantity(prev => (type === "increase" ? prev + 1 : prev > 1 ? prev - 1 : 1));
    };

    const handleAddToCart = async () => {
        const USER_ID = user?.id;
        if (product.availability) {
            try {
                const response = await api.post("/cart/addToCart", {
                    userId: USER_ID,
                    productId: product._id,
                    quantity,
                    selectedWeight
                });

                if (response.data.status === "success") {
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

    const handleBuyNow = async () => {
        const USER_ID = user?.id;
        if (product.availability) {
            try {
                const data = {
                    userId: USER_ID,
                    cartItems: [
                        {
                            productId: product._id,
                            quantity: quantity,
                            name: product.name,
                            price: price * quantity,
                            image: product.image,
                            selectedWeight: selectedWeight
                        }
                    ],
                    totalPrice: product.price
                };
                navigate("/checkout", { state: data });
            } catch (error) {
                notifyError("Please try again.");
            }
        }
    }

    if (!product) return <p className={styles.loading}>Loading product details...</p>;

    return (
        <div className={styles.pageContainer}>
            <div className={styles.productDetailsContainer}>
                <div className={styles.imageContainer}>
                    <img src={product.image} alt={product.name} className={styles.productImage} />
                    <div className={`${styles.categoryBadge} ${product.category === "veg" ? styles.vegTag : styles.nonVegTag}`}>
                        {product.category === "veg" ? "🌱 Veg" : "🍗 Non-Veg"}
                    </div>

                </div>

                <div className={styles.detailsContainer}>
                    <h1 className={styles.productName}>{product.name}</h1>
                    <p className={styles.productDescription}>{product.description}</p>

                    <div className={styles.features}>
                        <p><FaCheckCircle /> 100% Fresh</p>
                        <p><FaShippingFast /> Fast Delivery</p>
                        <p><FaTag /> Best Price Guarantee</p>
                    </div>

                    <div className={styles.weightSelector}>
                        <p className={styles.label}>Select Weight:</p>
                        {weightOptions.map(option => (
                            <button
                                key={option.value}
                                className={`${styles.weightButton} ${selectedWeight === option.value ? styles.active : ""}`}
                                onClick={() => setSelectedWeight(option.value)}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>

                    <div className={styles.quantitySelector}>
                        <p className={styles.label}>Quantity:</p>
                        <button className={styles.quantityButton} onClick={() => handleQuantityChange("decrease")}><FaMinus /></button>
                        <span className={styles.quantity}>{quantity}</span>
                        <button className={styles.quantityButton} onClick={() => handleQuantityChange("increase")}><FaPlus /></button>
                    </div>

                    <p className={styles.productPrice}>Total Price: ₹{(price * quantity).toFixed(2)}</p>

                    <p className={`${styles.stockStatus} ${product.availability ? styles.inStock : styles.outOfStock}`}>
                        {product.availability ? "✔ In Stock" : "✖ Out of Stock"}
                    </p>

                    <div className={styles.actions}>
                        <button className={styles.addToCartButton} onClick={handleAddToCart} disabled={!product.availability}>
                            Add to Cart
                        </button>
                        <button className={styles.buyNowButton} onClick={handleBuyNow} disabled={!product.availability}>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            <div className={`${styles.relatedProductsSection} ${showScrollButtons ? "showScrollButtons" : ""}`}>
                <h2>Related Products</h2>

                {showScrollButtons && (
                    <button className={styles.scrollButton} onClick={() => scrollRelated("left")}>
                        <FaChevronLeft />
                    </button>
                )}

                <div className={styles.relatedProductsList} ref={relatedRef}>
                    {relatedProducts.length > 0 ? (
                        relatedProducts.map((related) => (
                            <Link
                                to={`/product/${related._id}`}
                                key={related._id}
                                className={styles.relatedProductCard}
                            >
                                <img
                                    src={related.image}
                                    alt={related.name}
                                    className={styles.relatedProductImage}
                                />
                                <p className={styles.relatedProductName}>{related.name}</p>
                                <p className={styles.relatedProductWeight}>{related.weight}g</p>
                                <p className={styles.relatedProductPrice}>₹{related.price}</p>
                            </Link>
                        ))
                    ) : (
                        <p className={styles.noRelatedProducts}>No related products found.</p>
                    )}
                </div>

                {showScrollButtons && (
                    <button className={styles.scrollButton} onClick={() => scrollRelated("right")}>
                        <FaChevronRight />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
