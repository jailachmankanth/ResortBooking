import React from "react";
import { useNavigate } from "react-router-dom";
import "./CartItem.css";

const CartItem = ({ item }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/edit", {
      state: item,
    });
  };

  return (
    <div className="cart-item">
      <img
        src={item.image}
        alt={item.name}
        className="cart-image"
      />

      <div className="cart-details">
        <h2>{item.name}</h2>

        <p className="location">
          📍 {item.location}
        </p>

        <p>
          <strong>Check In:</strong>{" "}
          {item.checkIn}
        </p>

        <p>
          <strong>Check Out:</strong>{" "}
          {item.checkOut}
        </p>

        <p>
          <strong>Guests:</strong>{" "}
          {item.guests}
        </p>

        <p>
          <strong>Rooms:</strong>{" "}
          {item.rooms}
        </p>

        <button
          className="edit-btn"
          onClick={handleEdit}
        >
          ✏️ Edit Details
        </button>

        <h3>
          ₹{item.price} / Day
        </h3>
      </div>
    </div>
  );
};

export default CartItem;