import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Edit.css";

const Edit = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(
    state || {
      id: "",
      checkIn: "",
      checkOut: "",
      guests: 2,
      rooms: 1,
      price: 8500,
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedBooking = {
      ...booking,
      [name]: value,
    };

    const guests = Number(
      name === "guests"
        ? value
        : updatedBooking.guests
    );

    const rooms = Number(
      name === "rooms"
        ? value
        : updatedBooking.rooms
    );

    const basePrice = 8500;

    updatedBooking.price =
      basePrice * rooms +
      Math.max(0, guests - 2) * 1000;

    setBooking(updatedBooking);
  };

  const handleSave = () => {
    localStorage.setItem(
      "editedBooking",
      JSON.stringify(booking)
    );

    alert("Booking Updated Successfully!");

    navigate("/cart");
  };

  return (
    <div className="edit-container">
      <div className="edit-card">
        <h1>Edit Booking</h1>

        <div className="form-group">
          <label>Check In</label>
          <input
            type="date"
            name="checkIn"
            value={booking.checkIn}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Check Out</label>
          <input
            type="date"
            name="checkOut"
            value={booking.checkOut}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Guests</label>
          <input
            type="number"
            min="1"
            name="guests"
            value={booking.guests}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Rooms</label>
          <input
            type="number"
            min="1"
            name="rooms"
            value={booking.rooms}
            onChange={handleChange}
          />
        </div>

        <h2 className="price">
          Total Price: ₹{booking.price}
        </h2>

        <div className="btn-group">
          <button
            className="save-btn"
            onClick={handleSave}
          >
            Save Changes
          </button>

          <button
            className="cancel-btn"
            onClick={() => navigate("/cart")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;