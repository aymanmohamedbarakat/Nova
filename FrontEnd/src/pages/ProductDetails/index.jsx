import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useParams } from "react-router-dom";
import { ShopRepo } from "../../data/repo/ShopRepo";
import { useCart, useWishlist } from "../../store"; // Import the cart and wishlist store

export default function ProductDetails() {
  const { product_id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // Add quantity state
  const { addToCart } = useCart(); // Get the addToCart function
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist(); // Wishlist functions

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Product ID from URL:", product_id);
        
        if (!product_id) {
          setError("Product ID is missing");
          setLoading(false);
          return;
        }

        const response = await ShopRepo.productDetails(product_id);
        console.log("API Response:", response.data);
        setProductDetails(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError(error.message || "Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [product_id]);

  // Handle quantity changes
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (productDetails) {
      addToCart({
        id: productDetails.id,
        title: productDetails.title,
        price: productDetails.price,
        discount_price: productDetails.discount_price,
        image1: productDetails.image1,
      }, quantity);
      
      // Show feedback that item was added
      alert(`Added ${quantity} ${productDetails.title} to your cart!`);
    }
  };

  // Handle adding/removing from wishlist
  const handleWishlistClick = () => {
    if (productDetails) {
      if (isInWishlist(productDetails.id)) {
        removeFromWishlist(productDetails.id);
      } else {
        addToWishlist(productDetails);
      }
    }
  };

  if (loading) return <div className="container mt-5 text-center">Loading...</div>;
  if (error) return <div className="container mt-5 alert alert-danger">Error: {error}</div>;
  if (!productDetails) return <div className="container mt-5 alert alert-warning">Product not found</div>;

  return (
    <div
      className="container py-5"
      id={styles.productDetails}
    >
      <div className="row d-flex justify-content-between align-items-center">
        {/* Product Image Section */}
        <div className="col-12 col-lg-6 mb-4 mb-lg-0">
          <img
            src={productDetails?.image1 || "https://www.mobismea.com/upload/iblock/2a0/2f5hleoupzrnz9o3b8elnbv82hxfh4ld/No%20Product%20Image%20Available.png"}
            alt={productDetails?.title || "Product image"}
            className="img-fluid rounded shadow-lg"
          />
        </div>
        
        {/* Product Details Section */}
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-between gap-4">
          <div className="title">
            <h2 className="fw-bold text-dark">{productDetails?.title || "Unknown Product"}</h2>
            <span className="stars fs-4 text-warning" id={styles.stars}>
              ★★★★☆
            </span>
          </div>
          <div className="price d-flex align-items-center gap-3">
            <h5 className="fs-3 text-primary mb-0">
              ${productDetails?.discount_price || productDetails?.price || "N/A"}
            </h5>
            {productDetails?.discount_price < productDetails?.price && (
              <del className="text-muted fs-5">${productDetails?.price}</del>
            )}
          </div>
          <p className="fs-5 text-muted">{productDetails?.description || "No description available"}</p>

          {/* Quantity Input */}
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">Quantity:</label>
            <input 
              type="number" 
              id="quantity" 
              className="form-control w-25" 
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
          </div>

          {/* Action Buttons */}
          <div className="btn-group d-flex gap-4">
            <button className="btn btn-primary py-3 px-5" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="btn btn-outline-danger py-3 px-5" onClick={handleWishlistClick}>
              {isInWishlist(productDetails.id) ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
