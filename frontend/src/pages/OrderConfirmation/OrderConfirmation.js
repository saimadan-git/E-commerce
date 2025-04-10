import React from "react";
import styles from "./OrderConfirmation.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import successImage from "../../assests/images/success.jpeg";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails } = location.state || {};
  console.log("Order Details:", orderDetails);

  if (!orderDetails) {
    return (
      <div className={styles.errorContainer}>
        <h2>Oops! Something went wrong.</h2>
        <button onClick={() => navigate("/")} className={styles.homeButton}>Go Home</button>
      </div>
    );
  }

  const { orderId, items, address, totalAmount } = orderDetails;

  return (
    <div className={styles.container}>
      {/* Top Section */}
      <div className={styles.topSection}>
        {/* <img
          src={successImage} // Replace with your emoji image path
          alt="Success"
          className={styles.successImage}
        /> */}
        <h1 className={styles.successMessage}>Thank you for your order! 🎉</h1>
        <p className={styles.subMessage}>We’ll contact you soon via call or WhatsApp</p>
      </div>

      {/* Main Content Section */}
      <div className={styles.contentSection}>
        {/* Left - Order Details */}
        <div className={styles.card}>
          <h3>🧾 Order Summary</h3>
          <p><strong>Order ID:</strong> {orderId}</p>
          <div className={styles.itemList}>
            {items?.map((item, idx) => (
              <div key={idx} className={styles.itemRow}>
                <span>🧂 {item.productId.name}({item.selectedWeight}g) x {item.quantity}</span> 
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className={styles.total}>
            <span>Total:</span>
            <span>₹{totalAmount}</span>
          </div>
          {/* <p><strong>Payment:</strong> {paymentMode}</p> */}
        </div>

        {/* Right - Address Details */}
        <div className={styles.card}>
          <h3>📦 Delivery Address</h3>
          <p><strong>{address?.name}</strong></p>
          <p>{address?.address}, {address?.area}, {address?.city}</p>
          <p>{address?.state} - {address?.pincode}</p>
          <p>📞 {address?.mobileNumber}</p>
          <p>🏷️ {address?.type === "home" ? "Home" : address?.type === "office" ? "Office" : address?.customType}</p>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className={styles.actions}>
        <button onClick={() => navigate("/orders")} className={styles.secondaryBtn}>📦 View My Orders</button>
        <button onClick={() => navigate("/")} className={styles.primaryBtn}>🏠 Go to Home</button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;