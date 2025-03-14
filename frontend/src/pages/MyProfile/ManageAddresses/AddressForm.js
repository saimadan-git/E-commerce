import React, { useState } from "react";
import styles from "./AddressForm.module.css";
import api from "../../../utils/api";

const AddressForm = ({ initialData, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      mobile: "",
      pincode: "",
      address: "",
      area: "",
      city: "",
      state: "",
      landmark: "",
      alternateMobile: "",
      type: "home",
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData) {
        // Edit Address API Call
        await api.put(`/addresses/${initialData.id}`, formData);
      } else {
        // Add Address API Call
        await api.post("/addresses", formData);
      }
      onSubmit(formData);
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h3>{initialData ? "Edit Address" : "Add Address"}</h3>
      <form onSubmit={handleSubmit} className={styles.addressForm}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile" value={formData.mobile} onChange={handleChange} required />
        <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input name="area" placeholder="Area" value={formData.area} onChange={handleChange} />
        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
        <input name="landmark" placeholder="Landmark" value={formData.landmark} onChange={handleChange} />
        <input name="alternateMobile" placeholder="Alternate Mobile" value={formData.alternateMobile} onChange={handleChange} />
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="home">Home</option>
          <option value="office">Office</option>
          <option value="other">Other</option>
        </select>
        <div className={styles.formActions}>
          <button type="button" className={styles.cancelButton} onClick={onCancel}>Cancel</button>
          <button type="submit" className={styles.saveButton}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
