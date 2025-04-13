import React, { useEffect, useState, useContext } from "react";
import styles from "./MyOrders.module.css";
import AuthContext from "../../../context/AuthContext";
import api from "../../../utils/api";
import { notifyError } from "../../../utils/toastUtils";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get(`/order/getOrders/${user.id}`);
      console.log(data)
      setOrders(data.data);
    } catch (err) {
      notifyError("Failed to fetch orders.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>📦 My Orders</h1>

      {orders.length === 0 ? (
        <p className={styles.emptyMessage}>You haven't placed any orders yet.</p>
      ) : (
        <div className={styles.ordersList}>
          {orders.map((order, index) => (
            <div key={order._id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <h3>Order #{index + 1}</h3>
                <span className={styles.orderId}>🆔 {order.orderId}</span>
              </div>

              <div className={styles.orderContent}>
                <div className={styles.itemsSection}>
                  <h4>🧂 Items:</h4>
                  <ul>
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.ProductDetails.name} ({item.selectedWeight}g) x {item.quantity} — ₹{item.price}
                      </li>
                    ))}
                  </ul>
                  <p className={styles.total}>Total: ₹{order.amount}</p>
                  {/* <p>Payment Mode: {order.paymentMode}</p> */}
                </div>

                <div className={styles.addressSection}>
                  <h4>📍 Delivery Address:</h4>
                  <p><strong>{order.selectedAddress.name}</strong></p>
                  <p>{order.selectedAddress.address}, {order.selectedAddress.area}, {order.selectedAddress.city}</p>
                  <p>{order.selectedAddress.state} - {order.selectedAddress.pincode}</p>
                  <p>📞 {order.selectedAddress.mobileNumber}</p>
                  <p>{order.selectedAddress.type}</p>
                  <p>🏷️ {order.selectedAddress.type === "home" ? "Home" : order.selectedAddress.type === "office" ? "Office" : order.selectedAddress.customType}</p>
                </div>
              </div>

              <div className={styles.footer}>
                <p>
                  Ordered On:{" "}
                  {new Date(order.orderDate).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
              </p>
            </div>
            </div>
      ))}
    </div>
  )
}
    </div >
  );
};

export default MyOrdersPage;
