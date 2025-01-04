import React, { useState } from "react";
import "./Profile.css";

const ProfilePage = () => {
  // Mock user data
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Pickle Street, Flavor Town, USA",
    mobile: "+1 234 567 8900",
    profilePicture: "https://via.placeholder.com/150",
  });

  // Modal state for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEdit = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <div className="profile-card">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="profile-picture"
        />
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      </div>

      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Profile</h2>
            <label>
              Name:
              <input
                type="text"
                value={editedUser.name}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, name: e.target.value })
                }
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={editedUser.email}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, email: e.target.value })
                }
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                value={editedUser.address}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, address: e.target.value })
                }
              />
            </label>
            <label>
              Mobile:
              <input
                type="text"
                value={editedUser.mobile}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, mobile: e.target.value })
                }
              />
            </label>
            <div className="modal-actions">
              <button onClick={handleEdit}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
