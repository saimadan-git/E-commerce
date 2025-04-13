import React, { useState } from "react";
import styles from "./AddressForm.module.css";

const AddressForm = ({ initialData, onSave, onCancel }) => {
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      mobileNumber: "",
      address: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
      alternateMobile: "",
      type: "home",
      customType: "",
    }
  );

  const [errors, setErrors] = useState({});
  const [customTypeEnabled, setCustomTypeEnabled] = useState(
    initialData?.type === "other" && initialData?.customType?.trim() !== ""
  );

  const validateField = (name, value) => {
    let error = "";
    if (!value && name !== "landmark" && name !== "alternateMobile" && name !== "default") {
      if (name === "customType" && !customTypeEnabled) {
        return error; // Don't show error if customLabel is false
      }
      error = `*${name} is required.`;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "type" && value === "other") {
      setCustomTypeEnabled(true);
    } else if (name === "type") {
      setCustomTypeEnabled(false);
      setFormData((prev) => ({ ...prev, customType: "" }));
    }
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = Object.keys(formData).reduce((acc, key) => {
      acc[key] = validateField(key, formData[key]);
      return acc;
    }, {});

    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error)) return;
    onSave(formData);
  };

  return (
    <div className={styles.addressFormContainer}>
      <h2 className={styles.addressFormTitle}>
        {initialData ? "Edit Address" : "Add Address"}
      </h2>

      <form className={styles.addressForm} onSubmit={handleSubmit}>
        
        {/* Row 1: Name & Mobile */}
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <input type="text" name="name" placeholder=" " value={formData.name} onChange={handleChange} />
            <label>Name</label>
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>
          <div className={styles.formGroup}>
            <input type="text" name="mobileNumber" placeholder=" " value={formData.mobileNumber} onChange={handleChange} />
            <label>Mobile</label>
            {errors.mobileNumber && <p className={styles.error}>{errors.mobileNumber}</p>}
          </div>
        </div>

        {/* Row 2: Address */}
        <div className={styles.row}>
        <div className={styles.formGroup}>
          <textarea name="address" placeholder=" " value={formData.address} onChange={handleChange} />
          <label>Address</label>
          {errors.address && <p className={styles.error}>{errors.address}</p>}
        </div>
        </div>

        {/* Row 3: Area, City & State */}
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <input type="text" name="area" placeholder=" " value={formData.area} onChange={handleChange} />
            <label>Area</label>
            {errors.area && <p className={styles.error}>{errors.area}</p>}
          </div>
          <div className={styles.formGroup}>
            <input type="text" name="city" placeholder=" " value={formData.city} onChange={handleChange} />
            <label>City</label>
            {errors.city && <p className={styles.error}>{errors.city}</p>}
          </div>
          <div className={styles.formGroup}>
            <select name="state" value={formData.state} onChange={handleChange}>
              <option value="">Select State</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {/* <label>State</label> */}
            {errors.state && <p className={styles.error}>{errors.state}</p>}
          </div>
        </div>

        {/* Row 4: Pincode, Landmark & Alternate Mobile */}
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <input type="text" name="pincode" placeholder=" " value={formData.pincode} onChange={handleChange} />
            <label>Pincode</label>
            {errors.pincode && <p className={styles.error}>{errors.pincode}</p>}
          </div>
          <div className={styles.formGroup}>
            <input type="text" name="landmark" placeholder=" " value={formData.landmark} onChange={handleChange} />
            <label>Landmark (Optional)</label>
          </div>
          <div className={styles.formGroup}>
            <input type="text" name="alternateMobile" placeholder=" " value={formData.alternateMobile} onChange={handleChange} />
            <label>Alternate Mobile (Optional)</label>
          </div>
        </div>

        {/* Row 5: Address Type (Radio Buttons) */}
        <div className={styles.row}>
        <div >
          <label>Address Type:</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input type="radio" name="type" value="home" checked={formData.type === "home"} onChange={handleChange} />
              Home
            </label>
            <label>
              <input type="radio" name="type" value="office" checked={formData.type === "office"} onChange={handleChange} />
              Office
            </label>
            <label>
              <input type="radio" name="type" value="other" checked={formData.type === "other"} onChange={handleChange} />
              Other
            </label>
          </div>

          {customTypeEnabled && (
            <div className={styles.customTypeInput}>
              <input type="text" name="customType" placeholder="Enter custom type" value={formData.customType} onChange={handleChange} />
              {errors.customType && <p className={styles.error}>{errors.customType}</p>}
            </div>
          )}
        </div>
        </div>

        {/* Buttons */}
        <div className={styles.buttonContainer}>
          <button type="button" className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className={styles.saveButton}>
            {initialData ? "Update" : "Save"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddressForm;
