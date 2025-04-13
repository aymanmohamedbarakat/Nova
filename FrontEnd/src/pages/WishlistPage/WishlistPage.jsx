import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWishlist, useDetails, useCart, useAuth } from "../../store";
import { CiTrash } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { toast } from "react-toastify";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, fetchWishlist, isLoading: wishlistLoading, error: wishlistError } = useWishlist();
  const { isAuthenticated, user } = useAuth();
  const { addToCart } = useCart();
  const { openDetails } = useDetails();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/wishlist" } });
      toast.info("Please login to view your wishlist");
      return;
    }
    
    // Load wishlist from API
    const loadWishlist = async () => {
      try {
        setIsLoading(true);
        await fetchWishlist();
      } catch (error) {
        toast.error("Failed to load wishlist items");
        console.error("Wishlist loading error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadWishlist();
  }, [isAuthenticated, fetchWishlist, navigate]);

  // Show error if there's a wishlist error
  useEffect(() => {
    if (wishlistError) {
      toast.error(wishlistError);
    }
  }, [wishlistError]);

  const handleRemoveFromWishlist = async (productId) => {
    setShowConfirmation(false);
    setItemToRemove(null);
    
    try {
      await removeFromWishlist(productId);
      toast.success("Product removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove product");
      console.error("Remove from wishlist error:", error);
    }
  };

  const confirmRemove = (productId) => {
    setItemToRemove(productId);
    setShowConfirmation(true);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("Product added to cart");
  };

  const handleAddAllToCart = () => {
    const itemsToAdd = selectedItems.length > 0 
      ? wishlistItems.filter(item => selectedItems.includes(item.id))
      : wishlistItems;
    
    itemsToAdd.forEach(item => {
      addToCart(item);
    });
    
    toast.success(`${itemsToAdd.length} items added to cart`);
    
    // Clear selection after adding to cart
    setSelectedItems([]);
  };

  const toggleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const selectAllItems = () => {
    if (selectedItems.length === wishlistItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistItems.map(item => item.id));
    }
  };

  // Sort items based on selected option
  const getSortedWishlistItems = () => {
    const items = [...wishlistItems];
    
    switch (sortOption) {
      case "price-low":
        return items.sort((a, b) => {
          const priceA = a.discount_price || a.price;
          const priceB = b.discount_price || b.price;
          return priceA - priceB;
        });
      case "price-high":
        return items.sort((a, b) => {
          const priceA = a.discount_price || a.price;
          const priceB = b.discount_price || b.price;
          return priceB - priceA;
        });
      case "name-asc":
        return items.sort((a, b) => a.title.localeCompare(b.title));
      case "name-desc":
        return items.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return items;
    }
  };

  // Display loading state
  if (isLoading || wishlistLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading your wishlist...</p>
      </div>
    );
  }

  // Display empty wishlist message
  if (wishlistItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2 className="mb-4">Your Wishlist is Empty</h2>
        <p className="mb-4">You haven't added any products to your wishlist yet.</p>
        <Link to="/products" className="btn btn-primary px-4 py-2">
          Browse Products
        </Link>
      </div>
    );
  }

  const sortedItems = getSortedWishlistItems();

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">My Wishlist ({wishlistItems.length} items)</h2>
        
        <div className="d-flex gap-3">
          {/* Sorting options */}
          <select 
            className="form-select" 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{ width: "auto" }}
          >
            <option value="default">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
          
          {/* Multiple selection and add to cart button */}
          <div className="d-flex gap-2">
            <button 
              className="btn btn-outline-secondary d-flex align-items-center"
              onClick={selectAllItems}
            >
              <BiSolidSelectMultiple className="me-1" />
              {selectedItems.length === wishlistItems.length ? "Deselect All" : "Select All"}
            </button>
            
            <button 
              className="btn btn-primary d-flex align-items-center"
              onClick={handleAddAllToCart}
              disabled={wishlistItems.length === 0}
            >
              <FaShoppingCart className="me-1" />
              {selectedItems.length > 0 
                ? `Add Selected (${selectedItems.length}) to Cart` 
                : "Add All to Cart"}
            </button>
          </div>
        </div>
      </div>
      
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Removal</h5>
                <button type="button" className="btn-close" onClick={() => setShowConfirmation(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to remove this item from your wishlist?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowConfirmation(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={() => handleRemoveFromWishlist(itemToRemove)}>Remove</button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="row">
        {sortedItems.map((item) => (
          <div key={item.id} className="col-md-6 col-lg-4 mb-4">
            <div className={`card h-100 ${selectedItems.includes(item.id) ? "border border-primary" : ""}`}>
              {/* Selection checkbox */}
              <div className="position-absolute top-0 start-0 p-2">
                <div className="form-check">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelectItem(item.id)}
                  />
                </div>
              </div>
              
              {/* Product Image */}
              <div 
                className="product-img-container"
                style={{ 
                  height: "200px", 
                  overflow: "hidden",
                  cursor: "pointer",
                  position: "relative"
                }}
                onClick={() => openDetails(item.id)}
              >
                <img 
                  src={item.image1 || "https://www.mobismea.com/upload/iblock/2a0/2f5hleoupzrnz9o3b8elnbv82hxfh4ld/No%20Product%20Image%20Available.png"} 
                  alt={item.title} 
                  className="card-img-top h-100"
                  style={{ objectFit: "cover" }}
                />
                
                {/* Discount badge if available */}
                {item.discount_price && (
                  <div 
                    className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 m-2 rounded-pill"
                  >
                    {Math.round((1 - item.discount_price / item.price) * 100)}% OFF
                  </div>
                )}
              </div>
              
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate" title={item.title}>{item.title}</h5>
                
                {item.description && (
                  <p className="card-text text-muted small" style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}>
                    {item.description}
                  </p>
                )}
                
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      {item.discount_price ? (
                        <>
                          <span className="text-decoration-line-through text-muted me-2">
                            ${item.price.toFixed(2)}
                          </span>
                          <span className="fw-bold">${item.discount_price.toFixed(2)}</span>
                        </>
                      ) : (
                        <span className="fw-bold">${item.price.toFixed(2)}</span>
                      )}
                    </div>
                    
                    {item.stock_quantity > 0 ? (
                      <span className="badge bg-success">In Stock</span>
                    ) : (
                      <span className="badge bg-danger">Out of Stock</span>
                    )}
                  </div>
                  
                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-outline-primary flex-grow-1"
                      onClick={() => handleAddToCart(item)}
                      disabled={item.stock_quantity <= 0}
                    >
                      Add to Cart
                    </button>
                    <button 
                      className="btn btn-outline-danger"
                      onClick={() => confirmRemove(item.id)}
                    >
                      <CiTrash className="me-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}