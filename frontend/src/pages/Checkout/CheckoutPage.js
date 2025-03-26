import React, { useState, useEffect, useContext } from "react";
import styles from "./CheckoutPage.module.css";
// import { useNavigate } from "react-router-dom";
// import AddressCard from "./AddressCard";
import OrderSummary from "./OrderSummary";
import api from "../../utils/api";
import { notifyError, notifySuccess } from "../../utils/toastUtils";
import AuthContext from "../../context/AuthContext";
import AddressForm from "../MyProfile/ManageAddresses/AddressForm";
import Modal from "react-modal";

const CheckoutPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [recentAddress, setRecentAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showAllAddresses, setShowAllAddresses] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  // const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  // Fetch address and cart details on page load
  useEffect(() => {
    fetchAddressAndCart();
  }, []);

  const fetchAddressAndCart = async () => {
    try {
      const addressResponse = await api.get(`/address/getAddressess/${user.id}`);
      const cartResponse = await api.get(`/cart/getCart/${user.id}`);

      setAddresses(addressResponse.data.data);
      setRecentAddress(addressResponse.data.data.slice(0, 3));
      setCartItems(cartResponse.data.data.cartItems);
      calculateTotal(cartResponse.data.data.cartItems);
    } catch (err) {
      notifyError("Failed to load data.");
    }
  };

  // Calculate Total Amount
  const calculateTotal = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  };

  // Validate before proceeding to payment
  const handlePayment = async () => {
    if (!selectedAddress) {
      notifyError("Please select a delivery address.");
      return;
    }

    if (!isChecked) {
      notifyError("Please agree to the Terms & Conditions.");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = async () => {
      try {
        // Create order on backend
        const { data } = await api.post("/order/createOrder", {
          userId: user.id,
          items: cartItems,
          amount: totalAmount
        });
        const options = {
          key: process.env.RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
          amount: data.data.amount,
          currency: "INR",
          name: "Malini Foods",
          description: "Test Transaction",
          order_id: data.data.id,
          handler: async function (response) {
            // Verify payment
            const verifyUrl = "/order/verifyPayment";
            console.log("Response: ", response);
            const { data } = await api.post(verifyUrl, response);
            if (data.status === "success") {
              notifySuccess("Payment Successful");
            } else {
              notifyError("Payment Failed");
            }
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: user.mobileNumber,
          },
          theme: {
            color: "#2d572c",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Error loading Razorpay:", error);
      }
    };
  };

  const handleAddressSelection = (address, selectedAddress) => {
    console.log("Selected Address: ", address);
    console.log("Previous Selected Address: ", selectedAddress);
    setSelectedAddress(address);

    // Update recentAddress with selectedAddress first, followed by the next 2 from prev
    setRecentAddress((prev) => {
      // Filter out the selected address from the previous addresses
      const filteredPrev = prev.filter((a) => a._id !== address._id);

      // Get the next 2 addresses from the filtered list
      const nextTwoAddresses = filteredPrev.slice(0, 2);

      // Set selected address at the first position
      return [address, ...nextTwoAddresses];
    });

  };


  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.progressBar}>
        <span className={styles.activeStep}>🛒 Cart</span> → 📦 Checkout → ✅ Confirmation
      </div>
      <div className={styles.checkoutContent}>
        {/* Address Section */}
        <div className={styles.section}>
          <h3>Delivery Address</h3>
          <div className={styles.addressList}>
            {recentAddress.map((address) => (
              <label
                key={address._id}
                className={`${styles.addressCard} ${String(selectedAddress?._id) === String(address._id) ? styles.selectedCard : ""
                  }`}
              >
                <input
                  type="radio"
                  name="selectedAddress"
                  value={address._id}
                  checked={selectedAddress?._id === address._id}
                  onChange={() => {
                    setSelectedAddress(address);
                  }}
                  className={styles.radioButton}
                />
                <div className={styles.addressDetails}>
                  <h4>{address.name}</h4>
                  <p>
                    {address.address}, {address.area}, {address.city},{" "}
                    {address.state} - {address.pincode}
                  </p>
                  <p>
                    📞{" "}
                    <span className={styles.greenText}>
                      {address.mobileNumber}
                    </span>
                  </p>
                  <p className={styles.addressType}>
                    {address.type === "home"
                      ? "🏡 Home"
                      : address.type === "office"
                        ? "🏢 Office"
                        : `🏷️ ${address.customType}`}
                  </p>
                </div>
              </label>
            )
            )}
          </div>

          {/* View All Addresses Button */}
          {addresses.length > 3 && (
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

        {/* View All Addresses Modal */}
        {/* <Modal
          isOpen={showAllAddresses}
          onRequestClose={() => setShowAllAddresses(false)}
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          <h3>Select Delivery Address</h3>
          <div className={styles.addressList}>
            {addresses.map((address) => (
              <label
                key={address._id}
                className={`${styles.addressCard} ${selectedAddress?._id === address._id ? styles.selectedCard : ""
                  }`}
              >
                <input
                  type="radio"
                  name="selectedAddress"
                  value={address._id}
                  checked={selectedAddress?._id === address._id}
                  onChange={() => setSelectedAddress(address)}
                />
                <div className={styles.addressDetails}>
                  <h4>{address.name}</h4>
                  <p>
                    {address.address}, {address.area}, {address.city},{" "}
                    {address.state} - {address.pincode}
                  </p>
                  <p>
                    📞{" "}
                    <span className={styles.greenText}>
                      {address.mobileNumber}
                    </span>
                  </p>
                  <p className={styles.addressType}>
                    {address.type === "home"
                      ? "🏡 Home"
                      : address.type === "office"
                        ? "🏢 Office"
                        : `🏷️ ${address.customType}`}
                  </p>
                </div>
              </label>
            ))}
          </div>
          <button
            className={styles.cancelButton}
            onClick={() => setShowAllAddresses(false)}
          >
            ❌ Close
          </button>
        </Modal> */}

        {/* Add Address Modal */}
        {/* <Modal
          isOpen={showAddressForm}
          onRequestClose={() => setShowAddressForm(false)}
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          <AddressForm
            onClose={() => {
              setShowAddressForm(false);
              fetchAddressAndCart(); // Reload addresses after adding
            }}
          />
          <button
            className={styles.cancelButton}
            onClick={() => setShowAddressForm(false)}
          >
            ❌ Cancel
          </button>
        </Modal> */}

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

              />
            </div>
          ) : (
            <>
              <h3>Select Delivery Address</h3>
              <div className={styles.modalAddressList}>
                {addresses.map((address) => (
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
                      onChange={() => handleAddressSelection(address, selectedAddress)}
                    />
                    <div className={styles.addressDetails}>
                      <h4>{address.name}</h4>
                      <p>
                        {address.address}, {address.area}, {address.city},{" "}
                        {address.state} - {address.pincode}
                      </p>
                    </div>
                  </label>
                ))}
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
        <button className={styles.payNowButton} onClick={handlePayment}>
          💸 Pay Now ₹{totalAmount}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
