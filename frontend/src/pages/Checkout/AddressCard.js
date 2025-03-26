// src/components/Checkout/AddressCard.js
import React from "react";
import styles from "./CheckoutPage.module.css";

const AddressCard = ({ address }) => {
  return (
    <div className={styles.addressCard}>
      <h4>{address.name}</h4>
      <p>
        {address.address}, {address.area}, {address.city}, {address.state} -{" "}
        {address.pincode}
      </p>
      <p>📞 {address.mobileNumber}</p>
    </div>
  );
};

export default AddressCard;
