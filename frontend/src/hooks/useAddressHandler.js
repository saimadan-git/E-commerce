import { useState } from "react";
import api from "../api"; // Adjust the path based on your project structure
import { notifySuccess, notifyError } from "../utils/notifications"; // Notification functions

const useAddressHandler = (userId, setIsFormOpen, setAddresses) => {
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (newAddress, selectedAddress) => {
    try {
      setLoading(true);
      let response;

      if (selectedAddress) {
        // Edit Address
        response = await api.put(`/address/updateAddress/${userId}/${selectedAddress._id}`, newAddress);
      } else {
        // Add Address
        response = await api.post(`/address/addAddress`, { ...newAddress, userId });
      }

      if (response.data.status === "success") {
        notifySuccess(response.data.message);

        // Update state instead of making an extra API call
        setAddresses((prev) =>
          selectedAddress
            ? prev.map((addr) => (addr._id === selectedAddress._id ? response.data.data : addr)) // Update
            : [...prev, response.data.data] // Add
        );
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      notifyError(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsFormOpen(false);
      setLoading(false);
    }
  };

  return { handleFormSubmit, loading };
};

export default useAddressHandler;
