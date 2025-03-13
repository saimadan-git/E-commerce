import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import styles from "./Cart.module.css";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import emptyCartImage from "../../assests/images/empty-cart.png";
import AuthContext from "../../context/AuthContext";
import Loader from "../../components/Loader";
import { notifyError, notifySuccess } from "../../utils/toastUtils";

const Cart = () => {
    const { user } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        setIsLoading(true);
        try {
            const response = await api.get(`/cart/getCart/${user.id}`);
            setCartItems(response.data.data.cartItems);
            setTotalPrice(response.data.data.totalPrice);
        } catch (error) {
            console.error("Error fetching cart items:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateCartItem = async (itemId, quantity) => {
        setIsLoading(true);
        try {
            const response = await api.put(`/cart/updateCart/${user.id}/${itemId}`, { quantity });
            if (response.data.status === 'success') {
                fetchCartItems();
                notifySuccess(response.data.message);
            } else {
                notifyError(response.data.message);
            }
        } catch (error) {
            console.error("Error updating cart item:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const removeCartItem = async (itemId, selectedWeight) => {
        setIsLoading(true);
        try {
            const response = await api.delete(`/cart/removeItem/${user.id}/${itemId}`);
            if (response.data.status === 'success') {
                fetchCartItems();
                notifySuccess(response.data.message);
            } else {
                notifyError(response.data.message);
            }
        } catch (error) {
            console.error("Error removing cart item:", error);
        } 
        finally {
            setIsLoading(false);
        }
    };

    const handleQuantityChange = (item, type) => {
        const newQuantity = type === "increase" ? item.quantity + 1 : Math.max(item.quantity - 1, 1);
        updateCartItem(item._id, newQuantity, item.selectedWeight);
    };

    return (
        <div className={styles.cartContainer}>
            {/* <h1 className={styles.cartTitle}>Your Shopping Cart</h1> */}

            {isLoading && <Loader />}

            {!isLoading && cartItems.length === 0 ? (
                <div className={styles.emptyCartContainer}>
                    <img src={emptyCartImage} alt="Empty Cart" className={styles.emptyCartImage} />
                    <p className={styles.emptyCartText}>Your cart is empty! Start shopping now.</p>
                    <Link to="/" className={styles.shopNowButton}>Shop Now</Link>
                </div>
            ) : (
                <div className={styles.cartLayout}>
                    <div className={styles.cartItemsSection}>
                        {cartItems.map(item => (
                            <div key={item._id} className={styles.cartItem}>
                                <img src={item.productId.image} alt={item.productId.name} className={styles.productImage} />
                                <div className={styles.details}>
                                    <h2 className={styles.productName}>{item.productId.name}</h2>
                                    <div className={styles.selectedWeight}>Weight: {item.selectedWeight}g</div>
                                    <div className={styles.quantitySelector}>
                                        <button onClick={() => handleQuantityChange(item, "decrease")} className={styles.quantityButton}>
                                            <FaMinus />
                                        </button>
                                        <span className={styles.quantity}>{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item, "increase")} className={styles.quantityButton}>
                                            <FaPlus />
                                        </button>
                                    </div>
                                </div>
                                <p className={styles.productPrice}>₹{item.price}</p>
                                <button className={styles.removeButton} onClick={() => removeCartItem(item._id, item.selectedWeight)}>
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className={styles.cartSummarySection}>
                        <h2 className={styles.totalPrice}>Total: ₹{totalPrice}</h2>
                        <button className={styles.checkoutButton}>Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;