import React from "react";
import "./BookingSummary.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const BookingSummary = ({ items = [] }) => {
  const navigate = useNavigate();

  const subtotal = items.reduce(
    (total, item) => total + (item.price || 0),
    0
  );

  const tax = subtotal * 0.18;
  const grandTotal = subtotal + tax;

  const handleCheckout = () => {
    navigate("/success", {
      state: {
        items,
        subtotal,
        tax,
        grandTotal,
      },
    });
  };

  return (
    <div className="booking-summary">
      <h2>Booking Summary</h2>

      <div className="summary-row">
        <span>Items</span>
        <span>{items.length}</span>
      </div>

      <div className="summary-row">
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>

      <div className="summary-row">
        <span>GST (18%)</span>
        <span>₹{tax.toFixed(2)}</span>
      </div>

      <hr />

      <div className="summary-total">
        <span>Total</span>
        <span>₹{grandTotal.toFixed(2)}</span>
      </div>
      
      <button
          className="checkout-btn"
          onClick={handleCheckout}
        >
          Proceed to Checkout
      </button>
    </div>
  );
};

export default BookingSummary;