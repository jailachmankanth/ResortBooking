import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import jsPDF from "jspdf";
import "./Sucess.css";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingData = location.state;

  if (!bookingData) {
    return (
      <div className="success-container">
        <div className="success-card">
          <h1>🎉 Booking Successful!</h1>
          <p>No booking details found.</p>

          <button
            className="home-btn"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const { items, subtotal, tax, grandTotal } =
    bookingData;

  const downloadReceipt = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Aura Resorts Receipt", 20, 20);

    doc.setFontSize(14);
    doc.text(
      `Date : ${new Date().toLocaleDateString()}`,
      20,
      40
    );

    let y = 60;

    doc.text("Booked Resorts:", 20, y);

    y += 15;

    items.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.name} - ₹${item.price}`,
        20,
        y
      );
      y += 10;
    });

    y += 10;
    doc.text(
      `Subtotal : ₹${subtotal.toFixed(2)}`,
      20,
      y
    );

    y += 10;
    doc.text(
      `GST : ₹${tax.toFixed(2)}`,
      20,
      y
    );

    y += 10;
    doc.text(
      `Grand Total : ₹${grandTotal.toFixed(2)}`,
      20,
      y
    );

    doc.save("Aura-Receipt.pdf");
  };

  return (
    <div className="success-container">
      <Confetti />

      <div className="success-card">
        <div className="tick">✅</div>

        <h1>Booking Successful!</h1>

        <p>
          Thank you for choosing Aura Resorts.
        </p>

        <h2>
          Total Paid: ₹{grandTotal.toFixed(2)}
        </h2>

        <div className="button-group">
          <button
            className="download-btn"
            onClick={downloadReceipt}
          >
            Download Receipt
          </button>

          <button
            className="home-btn"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;