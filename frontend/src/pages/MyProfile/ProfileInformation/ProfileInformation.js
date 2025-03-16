import React, { useState, useEffect } from "react";
import { FaEdit, FaSave } from "react-icons/fa"; // Edit & Save Icons
import styles from "./ProfileInformation.module.css";
import api from "../../../utils/api.js";
import { notifyError, notifySuccess } from "../../../utils/toastUtils.js";
import Loader from "../../../components/Loader";

const Profile = () => {
  // State for user details
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    mobileNumber: "",
  });
  const [loading, setLoading] = useState(false);

  // State to manage edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user data from local storage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    setUserDetails({
      name: storedUser.name || "",
      email: storedUser.email || "",
      mobileNumber: storedUser.mobileNumber || "",    });
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  // Save changes to local storage
  const handleSave = async () => {
    setLoading(true);
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const isUpdated = (storedUser.name !== userDetails.name) || (storedUser.email !== userDetails.email) || (storedUser.mobileNumber !== userDetails.mobileNumber);

    if (isUpdated) {
      try {
        const response = await api.put(`/user/updateUser/${storedUser.id}`, userDetails);
        if (response.data.status === "success") {
          localStorage.setItem("user", JSON.stringify({...storedUser, ...userDetails}));
          notifySuccess(response.data.message);
        } else {
          notifyError(response.data.message);
        }
      } catch (err) {
        console.log(err)
        const errorMsg = err.response?.data?.message || "Something went wrong!";
        notifyError(errorMsg);
      }
    }
    setIsEditing(false);
    setLoading(false);
  };

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.profileTitle}>My Profile</h2>
      {loading && <div className={styles.loaderOverlay}><Loader /></div>}
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
          <label>Mobile Number:</label>
          <input
            type="text"
            name="mobileNumber"
            value={userDetails.mobileNumber}
            onChange={handleChange}
            disabled={!isEditing}
            className={isEditing ? styles.editable : styles.disabledInput}
          />
        </div>
{/* 
        <div className={styles.inputGroup}>
          <label>Address:</label>
          <textarea
            name="address"
            value={userDetails.address}
            onChange={handleChange}
            disabled={!isEditing}
            className={isEditing ? styles.editable : styles.disabledInput}
          />
        </div> */}
      </div>
      
      <button className={styles.editButton} onClick={isEditing ? handleSave : () => setIsEditing(true)} disabled={loading}>
              {isEditing ? <FaSave /> : <FaEdit />} {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default Profile;
