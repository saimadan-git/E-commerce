import React, { useState, useEffect, useContext, useCallback } from "react";
import styles from "./CheckoutPage.module.css";
import OrderSummary from "./OrderSummary";
import api from "../../utils/api";
import { notifyError, notifySuccess } from "../../utils/toastUtils";
import AuthContext from "../../context/AuthContext";
import AddressForm from "../MyProfile/ManageAddresses/AddressForm";
import Modal from "react-modal";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [addresses, setAddresses] = useState([]);
  // const [recentAddress, setRecentAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showAllAddresses, setShowAllAddresses] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paying, setPaying] = useState(false);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  // Fetch address and cart details on page load
  useEffect(() => {
    if (user?.id) fetchAddressAndCart();
  }, [user?.id]);

  const fetchAddressAndCart = async () => {
    setLoading(true);
    try {
      const [addressResponse, cartResponse] = await Promise.all([
        api.get(`/address/getAddressess/${user.id}`),
        api.get(`/cart/getCart/${user.id}`)
      ]);

      const fetchedAddresses = addressResponse.data.data;
      setAddresses(fetchedAddresses);
      setSelectedAddress(fetchedAddresses[0]); // Set first address by default
      // setRecentAddress(fetchedAddresses.slice(0, 1));

      const fetchedCartItems = cartResponse.data.data.cartItems;
      setCartItems(fetchedCartItems);
      setTotalAmount(
        fetchedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
      );
    } catch {
      notifyError("Failed to load data.");
    }
    setLoading(false);
  };

  // useEffect(() => {
  //   if (!selectedAddress && recentAddress.length > 0) {
  //     setSelectedAddress(recentAddress[0]); // Set first address by default
  //   }
  // }, [recentAddress]);


  // Handle address selection
  const handleAddressSelection = useCallback((address) => {
    setSelectedAddress({ ...address });
    // if (recentAddress.some((a) => a._id === address._id)) return;
    // setRecentAddress((prev) => {
    //   const filteredPrev = prev.filter((a) => a._id !== address._id);
    //   return [address, ...filteredPrev.slice(0, 2)];
    // });
  }, []);

  // Handle Razorpay payment
  const handlePayment = async () => {
    if (!selectedAddress) return notifyError("Please select a delivery address.");
    if (!isChecked) return notifyError("Please agree to the Terms & Conditions.");

    setPaying(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = async () => {
      try {
        const { data } = await api.post("/order/createOrder", {
          userId: user.id,
          items: cartItems,
          amount: totalAmount
        });

        const options = {
          key: process.env.RAZORPAY_KEY_ID,
          amount: data.data.amount,
          currency: "INR",
          name: "Malini Foods",
          description: "Test Transaction",
          order_id: data.data.id,
          handler: async (response) => {
            const { data } = await api.post("/order/verifyPayment", response);
            data.status === "success" ? notifySuccess("Payment Successful") : notifyError("Payment Failed");
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: user.mobileNumber,
          },
          theme: { color: "#2d572c" },
        };

        new window.Razorpay(options).open();
      } catch {
        notifyError("Error initializing payment.");
      }

      setPaying(false);
    };
  };

  const handleOrder = async () => {
    if (!selectedAddress) return notifyError("Please select a delivery address.");
    if (!isChecked) return notifyError("Please agree to the Terms & Conditions.");
    setLoading(true);
     // API Call
     try {
      const response = await api.post("/order/createOrder", {
        userId: user.id, items: cartItems, amount: totalAmount, selectedAddress
      });

      if (response.data.status === "success") {
        // notifySuccess(response.data.message);
        // navigate("/");
        navigate("/order-confirmation", {
          state: {
            orderDetails: {
              orderId: response.data.data._id,
              address: selectedAddress,
              items: cartItems,
              totalAmount,
            },
          },
        });
      } else {
        notifyError(response.data.message);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong!";
      notifyError(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  const handleFormSubmit = async (newAddress) => {
    setLoading(true);
    newAddress.userId = user.id;
    const response = await api.post(`/address/addAddress`, newAddress);

    if (response.data.status === "success") {
      notifySuccess(response.data.message);
    } else {
      notifyError(response.data.message);
    }
    setShowAddressForm(false);
    fetchAddressAndCart(); // Reload addresses after adding
    setLoading(false);
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.progressBar}>
        <span className={styles.activeStep}>🛒 Cart</span> → 📦 Checkout → ✅ Confirmation
      </div>
      <div className={styles.checkoutContent}>
        {loading ? (<Loader />) : (
          <>
            {/* Address Section */}
            <div className={styles.section}>
              <h3>Delivery Address</h3>
              <div className={styles.addressList}>
                {/* {recentAddress.map((address) => { */}
                {/* return ( */}
                <label
                  key={selectedAddress._id}
                  className={styles.selectedAddressCard}
                >
                  <div className={styles.selectedAddressContainer}>
                    <div className={styles.addressIcon}>
                      📍
                    </div>

                    <div className={styles.addressDetails}>
                      <h4 className={styles.addressName}>{selectedAddress.name}</h4>
                      <p className={styles.addressText}>
                        {selectedAddress.address}, {selectedAddress.area}, {selectedAddress.city},
                        {selectedAddress.state} - {selectedAddress.pincode}
                      </p>
                      <p className={styles.contact}>
                        📞 <span>{selectedAddress.mobileNumber}</span>
                      </p>
                    </div>

                    <div className={styles.addressType}>
                      {selectedAddress.type === "home"
                        ? "🏡 Home"
                        : selectedAddress.type === "office"
                          ? "🏢 Office"
                          : `🏷️ ${selectedAddress.customType}`}
                    </div>
                  </div>
                </label>

                {/* ) */}
                {/* } */}
                {/* )} */}
              </div>

              {/* View All Addresses Button */}
              {addresses.length > 1 && (
                <button
                  className={styles.viewAllButton}
                  onClick={() => setShowAllAddresses(true)}
                >
                  View All Addresses
                </button>
              )}

              {/* Add New Address Button */}
              <button
                className={styles.addAddressButton}
                onClick={() => setShowAddressForm(true)}
              >
                + Add New Address
              </button>
            </div>

            <Modal
              isOpen={showAddressForm || showAllAddresses}
              onRequestClose={() => {
                setShowAddressForm(false);
                setShowAllAddresses(false);
              }}
              className={styles.modal}
              overlayClassName={styles.overlay}
              ariaHideApp={false}
            >
              <button
                className={styles.modalCloseButton}
                onClick={() => {
                  setShowAddressForm(false);
                  setShowAllAddresses(false);
                }}
              >
                ❎
              </button>

              {/* Add Address or View All Addresses */}
              {showAddressForm ? (
                <div className={styles.addressForm}>
                  <AddressForm
                    onClose={() => {
                      setShowAddressForm(false);
                      fetchAddressAndCart();
                    }}
                    onSave={handleFormSubmit}
                    onCancel={() => setShowAddressForm(false)}
                  />
                </div>
              ) : (
                <>
                  <h3>Select Delivery Address</h3>
                  <div className={styles.modalAddressList}>
                    {addresses.map((address) => {
                      return (
                        <label
                          key={address._id}
                          className={`${styles.modalAddressCard} ${String(selectedAddress?._id) === String(address._id) ? styles.selected : ""
                            }`}
                        >
                          <input
                            type="radio"
                            name="selectedAddress"
                            value={address._id}
                            checked={String(selectedAddress?._id) === String(address._id)}
                            onChange={() => {
                              handleAddressSelection(address);
                              setShowAllAddresses(false);
                            }}
                            className={styles.modalRadioButton}
                            key={address._id}
                          />

                          <div className={styles.addressDetails}>
                            <h4>{address.name}</h4>
                            <p>
                              {address.address}, {address.area}, {address.city},{" "}
                              {address.state} - {address.pincode}
                            </p>
                          </div>
                        </label>
                      )
                    })}
                  </div>
                </>
              )}
            </Modal>

            {/* Order Summary Section */}
            <div className={styles.section}>
              <h3>Order Summary</h3>
              <OrderSummary items={cartItems} totalAmount={totalAmount} />
            </div>

            {/* T&C Section */}
            <div className={styles.termsSection}>
              <input
                type="checkbox"
                id="terms"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <label htmlFor="terms">
                I agree to the <a href="/terms">Terms & Conditions</a>.
              </label>
            </div>

            {/* Pay Now Button */}
            <button className={styles.payNowButton} onClick={handlePayment} disabled={paying}>
              {paying ? "Processing Payment..." : `💸 Pay Now ₹${totalAmount}`}
            </button>
            <button className={styles.payNowButton} onClick={handleOrder} disabled={paying}>
              {paying ? "Placing Order..." : `Order Now`}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;