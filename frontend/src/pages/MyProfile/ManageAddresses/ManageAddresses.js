import React, { useState, useEffect, useContext } from "react";
import styles from "./ManageAddresses.module.css";
import AddressForm from "./AddressForm.js";
import api from "../../../utils/api";
import AuthContext from "../../../context/AuthContext";
import Loader from "../../../components/Loader/Loader.js";
import { notifyError, notifySuccess } from "../../../utils/toastUtils.js";

const ManageAddresses = () => {
  const { user } = useContext(AuthContext);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/address/getAddressess/${user.id}`);
      console.log(response.data);
      setAddresses(response.data.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
    setLoading(false);
  };
  // Fetch addresses from the API
  useEffect(() => {
    fetchAddresses();
  }, [] );

  // Handle Add Address Click
  const handleAddAddress = () => {
    setSelectedAddress(null);
    setIsFormOpen(true);
  };

  // Handle Edit Address Click
  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setIsFormOpen(true);
  };

  // Handle Delete Address
  const handleDeleteAddress = async (id) => {
    console.log("Deleting address with ID:", id);
    setLoading(true);
    try {
      const response = await api.delete(`/address/deleteAddress/${user.id}/${id}`);
      if (response.data.status === "success") {
        notifySuccess(response.data.message);
        fetchAddresses();
      } else {
        notifyError(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
    setLoading(false);
  };

  // Handle Form Submission (Add or Update)
  const handleFormSubmit = async (newAddress) => {
    setLoading(true);
    let response;
    if (selectedAddress) {
      // Edit Address
      response = await api.put(`/address/updateAddress/${user.id}/${selectedAddress._id}`, newAddress);
    } else {
      // Add Address
      newAddress.userId = user.id;
      response = await api.post(`/address/addAddress`, newAddress);
    }
    
    if (response.data.status === "success") {
      notifySuccess(response.data.message);
      fetchAddresses();
    } else {
      notifyError(response.data.message);
    }
    setIsFormOpen(false);
    setLoading(false);
  };

  return (
    <div className={styles.manageAddresses}>
      <div className={styles.header}>
        <h2>Manage Addresses</h2>
        <button className={styles.addButton} onClick={handleAddAddress}>
          + Add Address
        </button>
      </div>
      {loading && <div className={styles.loaderOverlay}><Loader /></div>}
      {isFormOpen ? (
        <AddressForm
          initialData={selectedAddress}
          onCancel={() => setIsFormOpen(false)}
          onSave={handleFormSubmit}
        />
      ) : (
        <div className={styles.addressList}>
          {(addresses.length === 0 && !loading) ? (
            <p className={styles.noAddress}>No addresses found.</p>
          ) : (
            addresses.map((address) => (
              <div key={address.id} className={styles.addressCard}>
                <div className={styles.addressDetails}>
                  <h4>{address.name}</h4>
                  <p>{address.address}, {address.area}, {address.city}, {address.state} - {address.pincode}</p>

                  {/* Mobile Number with Green Color */}
                  <p className={styles.callText}>📞 {address.mobileNumber}</p>

                  {/* Address Type with Icons */}
                  <p className={styles.addressType}>
                    {address.type === "home" && <span>🏠 Home</span>}
                    {address.type === "office" && <span>🏢 Office</span>}
                    {address.type === "other" && <span>📦 {address.customType || "Other"}</span>}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className={styles.options}>
                  <button onClick={() => handleEditAddress(address)}>✏️ Edit</button>
                  <button onClick={() => handleDeleteAddress(address._id)}>🗑️ Delete</button>
                </div>
              </div>

            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ManageAddresses;
