import React, { useState, useContext } from "react";
import styles from "./MyProfile.module.css";
import ProfileInformation from "./ProfileInformation";
import ManageAddresses from "./ManageAddresses";
import MyOrders from "./MyOrders";
import AuthContext from "../../context/AuthContext";

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState("profile");

  return (
    <div className={styles.profileContainer}>
      {/* Left Sidebar */}
      <aside className={styles.profileSidebar}>
        <h2 className={styles.sidebarTitle}>My Account</h2>
        <ul className={styles.sidebarMenu}>
          <li
            className={selectedTab === "profile" ? styles.activeTab : ""}
            onClick={() => setSelectedTab("profile")}
          >
            Profile Information
          </li>
          <li
            className={selectedTab === "addresses" ? styles.activeTab : ""}
            onClick={() => setSelectedTab("addresses")}
          >
            Manage Addresses
          </li>
          <li
            className={selectedTab === "orders" ? styles.activeTab : ""}
            onClick={() => setSelectedTab("orders")}
          >
            My Orders
          </li>
        </ul>
      </aside>

      {/* Right Content */}
      <main className={styles.profileContent}>
        {selectedTab === "profile" && <ProfileInformation user={user} />}
        {selectedTab === "addresses" && <ManageAddresses />}
        {selectedTab === "orders" && <MyOrders />}
      </main>
    </div>
  );
};

export default MyProfile;
