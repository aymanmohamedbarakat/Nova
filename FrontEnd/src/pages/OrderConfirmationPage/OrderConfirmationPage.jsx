import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShopRepo } from "../../data/repo/ShopRepo";
import { toast } from "react-toastify";

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setIsLoading(true);
        const orderData = await ShopRepo.getOrderDetails(orderId);
        setOrder(orderData);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Failed to load order details. Please try again later.");
        toast.error("Could not load order information");
      } finally {
        setIsLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Link to="/orders" className="btn btn-primary">
          Back to Orders
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container py-5 text-center">
        <h2>Order Not Found</h2>
        <p className="mt-3">We couldn't find the order you're looking for.</p>
        <Link to="/orders" className="btn btn-primary mt-3">
          View All Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card border-0 shadow">
        <div className="card-header bg-success text-white">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0">Order Confirmed!</h2>
            <div className="bg-white text-success px-3 py-1 rounded">
              Order #{order.id}
            </div>
          </div>
        </div>
        
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <div className="display-1 text-success mb-3">
              <i className="bi bi-check-circle-fill"></i>
            </div>
            <h3>Thank you for your purchase!</h3>
            <p className="text-muted">
              A confirmation email has been sent to {order.email || order.shipping_details?.email}
            </p>
          </div>

          <div className="row mb-4">
            <div className="col-md-6 mb-3 mb-md-0">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Shipping Details</h5>
                  <address className="mb-0">
                    <strong>{order.shipping_details?.name || order.customer_name}</strong><br />
                    {order.shipping_details?.address_line1}<br />
                    {order.shipping_details?.address_line2 && <>
                      {order.shipping_details.address_line2}<br />
                    </>}
                    {order.shipping_details?.city}, {order.shipping_details?.state} {order.shipping_details?.postal_code}<br />
                    {order.shipping_details?.country}<br />
                    <abbr title="Phone">P:</abbr> {order.shipping_details?.phone || "Not provided"}
                  </address>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Payment Information</h5>
                  <p><strong>Payment Method:</strong> {order.payment_method || "Credit Card"}</p>
                  {order.payment_details?.card_type && (
                    <p><strong>Card Type:</strong> {order.payment_details.card_type}</p>
                  )}
                  {order.payment_details?.last_four && (
                    <p><strong>Card Number:</strong> **** **** **** {order.payment_details.last_four}</p>
                  )}
                  <p><strong>Order Date:</strong> {new Date(order.created_at || order.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          <h5 className="card-title mb-3">Order Summary</h5>
          <div className="table-responsive mb-4">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-end">Price</th>
                  <th className="text-end">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((item) => (
                  <tr key={item.id || item.product_id}>
                    <td>
                      <div className="d-flex align-items-center">
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt={item.name || item.title} 
                            className="me-3" 
                            style={{ width: "50px", height: "50px", objectFit: "cover" }}
                          />
                        )}
                        <div>
                          <strong>{item.name || item.title}</strong>
                          {item.variant && <div className="small text-muted">{item.variant}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-end">${(item.price || item.unit_price).toFixed(2)}</td>
                    <td className="text-end">${((item.price || item.unit_price) * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="table-group-divider">
                <tr>
                  <td colSpan="3" className="text-end"><strong>Subtotal:</strong></td>
                  <td className="text-end">${(order.subtotal || calculateSubtotal(order.items)).toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="3" className="text-end"><strong>Shipping:</strong></td>
                  <td className="text-end">${(order.shipping_cost || 0).toFixed(2)}</td>
                </tr>
                {(order.tax > 0 || order.tax_amount > 0) && (
                  <tr>
                    <td colSpan="3" className="text-end"><strong>Tax:</strong></td>
                    <td className="text-end">${(order.tax || order.tax_amount || 0).toFixed(2)}</td>
                  </tr>
                )}
                {order.discount > 0 && (
                  <tr>
                    <td colSpan="3" className="text-end"><strong>Discount:</strong></td>
                    <td className="text-end">-${order.discount.toFixed(2)}</td>
                  </tr>
                )}
                <tr>
                  <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                  <td className="text-end fw-bold">${(order.total || calculateTotal(order)).toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Shipping Information</h5>
              <p className="mb-1"><strong>Shipping Method:</strong> {order.shipping_method || "Standard Shipping"}</p>
              <p className="mb-1"><strong>Estimated Delivery:</strong> {calculateEstimatedDelivery(order)}</p>
              {order.tracking_number && (
                <p className="mb-0">
                  <strong>Tracking Number:</strong> 
                  <a href={`https://tracking.example.com/${order.tracking_number}`} target="_blank" rel="noopener noreferrer">
                    {order.tracking_number}
                  </a>
                </p>
              )}
            </div>
          </div>

          <div className="text-center">
            <Link to="/products" className="btn btn-primary me-2">
              Continue Shopping
            </Link>
            <Link to="/orders" className="btn btn-outline-secondary">
              View All Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function calculateSubtotal(items) {
  if (!items || !Array.isArray(items)) return 0;
  return items.reduce((total, item) => {
    return total + (item.price || item.unit_price) * item.quantity;
  }, 0);
}

function calculateTotal(order) {
  if (!order) return 0;
  const subtotal = order.subtotal || calculateSubtotal(order.items);
  const shipping = order.shipping_cost || 0;
  const tax = order.tax || order.tax_amount || 0;
  const discount = order.discount || 0;
  return subtotal + shipping + tax - discount;
}

function calculateEstimatedDelivery(order) {
  // Default to 5-7 business days from order date
  const orderDate = new Date(order.created_at || order.date || new Date());
  
  let deliveryDays = 5;
  if (order.shipping_method) {
    const method = order.shipping_method.toLowerCase();
    if (method.includes("express") || method.includes("expedited")) {
      deliveryDays = 2;
    } else if (method.includes("next day") || method.includes("overnight")) {
      deliveryDays = 1;
    }
  }
  
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(orderDate.getDate() + deliveryDays);
  
  // Format the date
  return deliveryDate.toLocaleDateString("en-US", { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric'
  });
}