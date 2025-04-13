import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart, useAuth } from "../../store";
import { CiTrash } from "react-icons/ci";
import { ShopRepo } from "../../data/repo/ShopRepo";
import { toast } from "react-toastify";

export default function CartPage() {
  const {
    cartItems,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [checkoutInfo, setCheckoutInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiration: "",
    cvv: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle quantity change
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  // Handle remove item
  const handleRemoveItem = (productId) => {
    if (
      window.confirm(
        "Are you sure you want to remove this item from your cart?"
      )
    ) {
      removeFromCart(productId);
    }
  };

  // Handle checkout form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle payment info changes
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle checkout
  const handleCheckout = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    if (!isAuthenticated) {
      toast.info("Please login to complete your order");
      navigate("/login", { state: { from: "/cart" } });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create order data
      const orderData = {
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.discount_price || item.price,
        })),
        shipping_info: {
          ...checkoutInfo,
        },
        payment_method: "credit_card",
        payment_details: {
          ...paymentInfo,
        },
        total_amount: totalPrice,
      };

      // Place order through API
      const result = await ShopRepo.placeOrder(orderData);

      toast.success("Your order has been placed successfully!");
      clearCart();

      // Redirect to order confirmation page
      navigate(`/orders/${result.id}`);
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error("Order placement error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2 className="mb-4">Your Cart is Empty</h2>
        <p className="mb-4">
          Looks like you haven't added any products to your cart yet.
        </p>
        <Link to="/products" className="btn btn-primary px-4 py-2">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Your Shopping Cart</h2>

      <div className="row">
        {/* Cart Items */}
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Cart Items ({totalItems})</h5>
            </div>
            <div className="card-body">
              {cartItems.map((item) => (
                <div key={item.id} className="row mb-4 border-bottom pb-3">
                  <div className="col-md-2">
                    <img
                      src={
                        item.image1 ||
                        "https://www.mobismea.com/upload/iblock/2a0/2f5hleoupzrnz9o3b8elnbv82hxfh4ld/No%20Product%20Image%20Available.png"
                      }
                      alt={item.title}
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="col-md-5">
                    <h5>{item.title}</h5>
                    <p className="text-muted mb-0">
                      Price: ${item.discount_price || item.price}
                    </p>
                  </div>
                  <div className="col-md-3">
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="form-control form-control-sm mx-2"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value)
                          )
                        }
                        min="1"
                        style={{ width: "60px" }}
                      />
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="text-muted mt-2">
                      Subtotal: $
                      {(
                        (item.discount_price || item.price) * item.quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                  <div className="col-md-2 text-end">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <CiTrash className="me-1" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="text-end mt-3">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to clear your cart?"
                      )
                    ) {
                      clearCart();
                    }
                  }}
                >
                  Clear Cart
                </button>

                <div className="d-flex justify-content-between align-items-center mt-4">
                  <Link to="/products" className="btn btn-outline-primary">
                    Continue Shopping
                  </Link>
                  <Link to="/checkout" className="btn btn-primary">
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        {/* <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-header bg-white">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                  Subtotal
                  <span>${totalPrice.toFixed(2)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                  Shipping
                  <span>Free</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>Total amount</strong>
                    <p className="mb-0">(including VAT)</p>
                  </div>
                  <span>
                    <strong>${totalPrice.toFixed(2)}</strong>
                  </span>
                </li>
              </ul>

              <button
                className="btn btn-primary btn-lg btn-block w-100"
                onClick={() =>
                  document
                    .getElementById("checkoutForm")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div> */}
      </div>

      {/* Checkout Form */}
      {/* <div className="row mt-5" id="checkoutForm">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header bg-white">
              <h5 className="mb-0">Checkout Information</h5>
              {!isAuthenticated && (
                <div className="alert alert-info mt-3" role="alert">
                  <Link
                    to="/login"
                    className="alert-link"
                    state={{ from: "/cart" }}
                  >
                    Login
                  </Link>{" "}
                  or{" "}
                  <Link to="/register" className="alert-link">
                    Register
                  </Link>{" "}
                  to speed up your checkout experience!
                </div>
              )}
            </div>
            <div className="card-body">
              <form onSubmit={handleCheckout}>
                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={checkoutInfo.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={checkoutInfo.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={checkoutInfo.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      value={checkoutInfo.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="zipCode" className="form-label">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="zipCode"
                      name="zipCode"
                      value={checkoutInfo.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="country" className="form-label">
                      Country
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="country"
                      name="country"
                      value={checkoutInfo.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <h6>Payment Method</h6>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="creditCard"
                      checked
                      readOnly
                    />
                    <label className="form-check-label" htmlFor="creditCard">
                      Credit Card
                    </label>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cardNumber" className="form-label">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={handlePaymentChange}
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="expiration" className="form-label">
                      Expiration
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="expiration"
                      name="expiration"
                      placeholder="MM/YY"
                      value={paymentInfo.expiration}
                      onChange={handlePaymentChange}
                      required
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="cvv" className="form-label">
                      CVV
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={paymentInfo.cvv}
                      onChange={handlePaymentChange}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-lg w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Processing...
                    </>
                  ) : (
                    `Complete Order ($${totalPrice.toFixed(2)})`
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
