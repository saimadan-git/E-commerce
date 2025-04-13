// src/components/Checkout/OrderSummary.js
import React from "react";
import styles from "./CheckoutPage.module.css";

const OrderSummary = ({ items, totalAmount }) => {
  return (
    <div className={styles.orderSummary}>
      {items.map((item) => (
        <div key={item._id} className={styles.orderItem}>
          <p>
            {item.name} ({item.selectedWeight}g) x {item.quantity}
          </p>
          <p>₹{(item.price).toFixed(2)}</p>
        </div>
      ))}
      <hr />
      <div className={styles.total}>
        <strong>Total: ₹{totalAmount}</strong>
      </div>
    </div>
  );
};

export default OrderSummary;
