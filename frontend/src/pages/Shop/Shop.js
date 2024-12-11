import React, { useState, useEffect } from 'react';
import "./Shop.css";

const ShopPage = () => {
  // State to store the data
  const [products, setProducts] = useState([]);

  // Fetch sample JSON data
  useEffect(() => {
    fetch('sample_data.json') // Replace with the correct path to your JSON file
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  return (
    <div className="shop-page">
      <h1>Shop - Hyderabad Special Pickles</h1>
      <div className="products-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-weight">Weight: {product.weight}</p>
            <p className="product-price">₹{product.price}</p>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
