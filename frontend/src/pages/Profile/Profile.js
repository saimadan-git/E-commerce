import React, { useState, useEffect } from "react";
import { FaEdit, FaSave } from "react-icons/fa"; // Edit & Save Icons
import styles from "./Profile.module.css";
import api from "../../utils/api.js";
import { notifyError, notifySuccess } from "../../utils/toastUtils.js";

const Profile = () => {
  // State for user details
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });

  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user data from local storage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    setUserDetails({
      name: storedUser.name || "",
      email: storedUser.email || "",
      mobile: storedUser.mobile || "",
      address: storedUser.address || "",
    });
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  // Save changes to local storage
  const handleSave = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const isUpdated = JSON.stringify(storedUser) !== JSON.stringify(userDetails);

    if (isUpdated) {
      try {
        const response = await api.post("/user/updateUser", userDetails);
        if (response.data.status === "success") {
          localStorage.setItem("user", JSON.stringify({...storedUser, ...userDetails}));
          notifySuccess(response.data.message);
        } else {
          notifyError(response.data.message);
        }
      } catch (err) {
        const errorMsg = err.response?.data?.message || "Something went wrong!";
        notifyError(errorMsg);
      }
    }
    setIsEditing(false);
  };

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.profileTitle}>My Profile</h2>
      <div className={styles.profileDetails}>
        <div className={styles.inputGroup}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
            disabled={!isEditing}
            className={isEditing ? styles.editable : styles.disabledInput}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            disabled={!isEditing}
            className={isEditing ? styles.editable : styles.disabledInput}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Mobile:</label>
          <input
            type="text"
            name="mobile"
            value={userDetails.mobile}
            onChange={handleChange}
            disabled={!isEditing}
            className={isEditing ? styles.editable : styles.disabledInput}
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Address:</label>
          <textarea
            name="address"
            value={userDetails.address}
            onChange={handleChange}
            disabled={!isEditing}
            className={isEditing ? styles.editable : styles.disabledInput}
          />
        </div>
      </div>

      <button className={styles.editButton} onClick={isEditing ? handleSave : () => setIsEditing(true)}>
        {isEditing ? <FaSave /> : <FaEdit />} {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default Profile;
