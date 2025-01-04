// Cart.js
import React, { useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div style={styles.cartContainer}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. Start adding some pickles!</p>
      ) : (
        <ul style={styles.cartList}>
          {cartItems.map((item) => (
            <li key={item.id} style={styles.cartItem}>
              <div>
                <h3>{item.name}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                style={styles.removeButton}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleClearCart} style={styles.clearButton}>
        Clear Cart
      </button>
    </div>
  );
};
const styles = {
    cartContainer: {
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      margin: '20px',
      maxWidth: '400px',
      backgroundColor: '#f9f9f9',
    },
    cartList: {
      listStyleType: 'none',
      padding: 0,
    },
    cartItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 0',
      borderBottom: '1px solid #ddd',
    },
    removeButton: {
      backgroundColor: '#dc3545',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      padding: '5px 10px',
      cursor: 'pointer',
    },
    clearButton: {
      marginTop: '20px',
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      display: 'block',
      width: '100%',
    },
  };
  
  export default Cart;