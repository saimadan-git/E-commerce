import React, { useState, useEffect, useContext } from "react";
import styles from "./ManageAddresses.module.css";
import AddressForm from "./AddressForm.js";
import api from "../../../utils/api";
import AuthContext from "../../../context/AuthContext";

const ManageAddresses = () => {
  const { user } = useContext(AuthContext);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Fetch addresses from the API
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await api.get(`/user/${user.id}/addresses`);
        // setAddresses(response.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, [user.id]);

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
    try {
      await api.delete(`/user/${user.id}/addresses/${id}`);
      setAddresses(addresses.filter((address) => address.id !== id));
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  // Handle Form Submission (Add or Update)
  const handleFormSubmit = (newAddress) => {
    if (selectedAddress) {
      // Edit Address
      setAddresses(
        addresses.map((addr) => (addr.id === newAddress.id ? newAddress : addr))
      );
    } else {
      // Add New Address
      setAddresses([...addresses, newAddress]);
    }
    setIsFormOpen(false);
  };

  return (
    <div className={styles.manageAddresses}>
      <div className={styles.header}>
        <h2>Manage Addresses</h2>
        <button className={styles.addButton} onClick={handleAddAddress}>
          + Add Address
        </button>
      </div>

      {isFormOpen ? (
        <AddressForm
          initialData={selectedAddress}
          onCancel={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
        />
      ) : (
        <div className={styles.addressList}>
          {addresses.length === 0 ? (
            <p className={styles.noAddress}>No addresses found.</p>
          ) : (
            addresses.map((address) => (
              <div key={address.id} className={styles.addressCard}>
                <div className={styles.addressDetails}>
                  <h4>{address.name}</h4>
                  <p>{address.address}, {address.city}, {address.state} - {address.pincode}</p>
                  <p>📞 {address.mobile}</p>
                </div>
                <div className={styles.options}>
                  <button onClick={() => handleEditAddress(address)}>✏️ Edit</button>
                  <button onClick={() => handleDeleteAddress(address.id)}>🗑️ Delete</button>
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
