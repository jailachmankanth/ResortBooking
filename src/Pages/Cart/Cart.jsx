import React, { useEffect, useState } from "react";
import "./Cart.css";

import CartItem from "../../components/CartItem/CartItem";
import BookingSummary from "../../components/BookingSummary/BookingSummary";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const data = [
      {
        id: 1,
        name: "Ocean Paradise Resort",
        location: "Goa, India",
        price: 8500,
        image:
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
        checkIn: "2026-06-28",
        checkOut: "2026-06-30",
        guests: 2,
        rooms: 1,
      },
      {
        id: 2,
        name: "Mountain View Resort",
        location: "Ooty, India",
        price: 6500,
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
        checkIn: "2026-07-05",
        checkOut: "2026-07-08",
        guests: 4,
        rooms: 2,
      },
    ];

    const editedBooking = JSON.parse(
      localStorage.getItem("editedBooking")
    );

    if (editedBooking) {
      const updatedData = data.map((item) =>
        item.id === editedBooking.id
          ? editedBooking
          : item
      );

      setCartItems(updatedData);
    } else {
      setCartItems(data);
    }
  }, []);

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your Selection</h1>

        <p>
          Review your luxury stays before proceeding to
          finalize your reservation.
        </p>
      </div>

      <div className="cart-container">
        <div className="cart-left">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
            />
          ))}
        </div>

        <div className="cart-right">
          <BookingSummary
            items={cartItems}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;