import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart, useAuth } from "../../store";
import { ShopRepo } from "../../data/repo/ShopRepo";
import { toast } from "react-toastify";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, totalAmount, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Shipping details
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",

    // Payment details
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",

    // Other
    shippingMethod: "standard",
    saveInfo: false,
    sameAsBilling: true,
  });

  const [errors, setErrors] = useState({});

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/checkout" } });
      toast.info("Please login to proceed with checkout");
    }
  }, [isAuthenticated, navigate]);

  // Redirect to products page if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/products");
      toast.info("Your cart is empty. Add some products to checkout.");
    }
  }, [cartItems, navigate]);

  // Pre-fill form with user data if available
  useEffect(() => {
    if (user) {
      setFormData((prevState) => ({
        ...prevState,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        // Add more fields if user data contains them
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "zipCode",
      "country",
      "cardName",
      "cardNumber",
      "expiryDate",
      "cvv",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    // Credit card validation
    if (
      formData.cardNumber &&
      !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))
    ) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number";
    }

    // Expiry date validation (MM/YY format)
    if (
      formData.expiryDate &&
      !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)
    ) {
      newErrors.expiryDate = "Please use MM/YY format";
    }

    // CVV validation
    if (formData.cvv && !/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      toast.error("Please correct the errors in the form");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const orderData = {
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price || item.unit_price // Make sure this matches your cart item structure
        })),
        shipping_address: formData.address
      };
  
      console.log("Sending order data:", orderData);
  
      const response = await ShopRepo.placeOrder(orderData);
      clearCart();
      toast.success("Order placed successfully!");
      navigate(`/order-confirmation/${response.id}`);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  // Helper functions
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.discount_price || item.price;
      return total + price * item.quantity;
    }, 0);
  };

  const calculateShippingCost = (method) => {
    switch (method) {
      case "express":
        return 15.99;
      case "overnight":
        return 29.99;
      case "standard":
      default:
        return 5.99;
    }
  };

  const calculateTax = () => {
    // Simplified tax calculation (e.g., 8% tax)
    return calculateSubtotal() * 0.08;
  };

  const getCardType = (cardNumber) => {
    // Basic card type detection
    const firstDigit = cardNumber.charAt(0);

    if (cardNumber.startsWith("4")) {
      return "Visa";
    } else if (cardNumber.startsWith("5")) {
      return "Mastercard";
    } else if (cardNumber.startsWith("3")) {
      return "American Express";
    } else if (cardNumber.startsWith("6")) {
      return "Discover";
    }

    return "Unknown";
  };

  // Format credit card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8">
          <h2 className="mb-4">Checkout</h2>

          <form onSubmit={handleSubmit}>
            {/* Shipping Information */}
            <div className="card mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">Shipping Information</h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">
                      First Name *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.firstName ? "is-invalid" : ""
                      }`}
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                    {errors.firstName && (
                      <div className="invalid-feedback">{errors.firstName}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.lastName ? "is-invalid" : ""
                      }`}
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                    {errors.lastName && (
                      <div className="invalid-feedback">{errors.lastName}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                      Email *
                    </label>
                    <input
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      className={`form-control ${
                        errors.phone ? "is-invalid" : ""
                      }`}
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>

                  <div className="col-12">
                    <label htmlFor="address" className="form-label">
                      Address *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.address ? "is-invalid" : ""
                      }`}
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                    {errors.address && (
                      <div className="invalid-feedback">{errors.address}</div>
                    )}
                  </div>

                  <div className="col-12">
                    <label htmlFor="apartment" className="form-label">
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="apartment"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="city" className="form-label">
                      City *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.city ? "is-invalid" : ""
                      }`}
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                    {errors.city && (
                      <div className="invalid-feedback">{errors.city}</div>
                    )}
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="state" className="form-label">
                      State *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.state ? "is-invalid" : ""
                      }`}
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                    {errors.state && (
                      <div className="invalid-feedback">{errors.state}</div>
                    )}
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="zipCode" className="form-label">
                      Zip Code *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.zipCode ? "is-invalid" : ""
                      }`}
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                    />
                    {errors.zipCode && (
                      <div className="invalid-feedback">{errors.zipCode}</div>
                    )}
                  </div>

                  <div className="col-12">
                    <label htmlFor="country" className="form-label">
                      Country *
                    </label>
                    <select
                      className={`form-select ${
                        errors.country ? "is-invalid" : ""
                      }`}
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Mexico">Mexico</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan</option>
                    </select>
                    {errors.country && (
                      <div className="invalid-feedback">{errors.country}</div>
                    )}
                  </div>

                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="saveInfo"
                        name="saveInfo"
                        checked={formData.saveInfo}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="saveInfo">
                        Save this information for next time
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="card mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">Shipping Method</h5>
              </div>
              <div className="card-body">
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="shippingMethod"
                    id="standard"
                    value="standard"
                    checked={formData.shippingMethod === "standard"}
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label d-flex justify-content-between"
                    htmlFor="standard"
                  >
                    <span>Standard Shipping (5-7 business days)</span>
                    <span className="fw-bold">$5.99</span>
                  </label>
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="shippingMethod"
                    id="express"
                    value="express"
                    checked={formData.shippingMethod === "express"}
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label d-flex justify-content-between"
                    htmlFor="express"
                  >
                    <span>Express Shipping (2-3 business days)</span>
                    <span className="fw-bold">$15.99</span>
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="shippingMethod"
                    id="overnight"
                    value="overnight"
                    checked={formData.shippingMethod === "overnight"}
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label d-flex justify-content-between"
                    htmlFor="overnight"
                  >
                    <span>Overnight Shipping (1 business day)</span>
                    <span className="fw-bold">$29.99</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="card mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">Payment Information</h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="cardName" className="form-label">
                      Name on Card *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.cardName ? "is-invalid" : ""
                      }`}
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      required
                    />
                    {errors.cardName && (
                      <div className="invalid-feedback">{errors.cardName}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="cardNumber" className="form-label">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.cardNumber ? "is-invalid" : ""
                      }`}
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        const formattedValue = formatCardNumber(e.target.value);
                        setFormData((prev) => ({
                          ...prev,
                          cardNumber: formattedValue,
                        }));
                        if (errors.cardNumber) {
                          setErrors((prev) => ({ ...prev, cardNumber: null }));
                        }
                      }}
                      placeholder="XXXX XXXX XXXX XXXX"
                      maxLength="19"
                      required
                    />
                    {errors.cardNumber && (
                      <div className="invalid-feedback">
                        {errors.cardNumber}
                      </div>
                    )}
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="expiryDate" className="form-label">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.expiryDate ? "is-invalid" : ""
                      }`}
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      required
                    />
                    {errors.expiryDate && (
                      <div className="invalid-feedback">
                        {errors.expiryDate}
                      </div>
                    )}
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="cvv" className="form-label">
                      CVV *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.cvv ? "is-invalid" : ""
                      }`}
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="XXX"
                      maxLength="4"
                      required
                    />
                    {errors.cvv && (
                      <div className="invalid-feedback">{errors.cvv}</div>
                    )}
                    <div className="form-text">
                      3 or 4 digits on the back of your card
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="sameAsBilling"
                        name="sameAsBilling"
                        checked={formData.sameAsBilling}
                        onChange={handleChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="sameAsBilling"
                      >
                        Billing address same as shipping address
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-grid d-md-flex justify-content-md-end">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Processing...
                  </>
                ) : (
                  "Place Order"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="col-lg-4 mt-4 mt-lg-0">
          <div className="card position-sticky" style={{ top: "2rem" }}>
            <div className="card-header bg-light">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush mb-4">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-start px-0"
                  >
                    <div className="d-flex align-items-center">
                      {item.image1 && (
                        <img
                          src={item.image1}
                          alt={item.title}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                          className="me-2"
                        />
                      )}
                      <div>
                        <h6 className="mb-0">{item.title}</h6>
                        <small className="text-muted">
                          Qty: {item.quantity}
                        </small>
                      </div>
                    </div>
                    <span className="fw-bold">
                      $
                      {(
                        (item.discount_price || item.price) * item.quantity
                      ).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>
                  ${calculateShippingCost(formData.shippingMethod).toFixed(2)}
                </span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Tax</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-0">
                <h5>Total</h5>
                <h5>
                  $
                  {(
                    calculateSubtotal() +
                    calculateShippingCost(formData.shippingMethod) +
                    calculateTax()
                  ).toFixed(2)}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
