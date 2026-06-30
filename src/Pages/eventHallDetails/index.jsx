import "./index.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResortDetails = () => {
  const [eventHall, setEventHall] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState()
  const [userId, setUserId] = useState("")
  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`http://localhost:3000/eventHalls?id=${id}`)
      .then((response) => {

        const eventHallArray = Object.values(response.data);

        setEventHall(eventHallArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
    setUserId(localStorage.getItem("user_id"))

  }, []);

  const handleBooking = (resort) => {
    if (!checkIn || !checkOut) {
      alert("Please Select The CheckIn and CheckOut Dates.")
      return;
    }

    const cartData = {
      user_id: userId,
      eventhall_id: resort.id,
      check_in: checkIn,
      check_out: checkOut,
      guests: guests,
    };

    axios.post("http://localhost:3000/eventhall_carts", cartData)
      .then(() => {
        alert("Cart added successfully");
        setCheckIn("");
        setCheckOut("");
        setGuests(1);
      })
      .catch((error) => {
        console.error(error);
      });

  };
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (eventHall.length === 0) {
    return <h2>No Resort Found</h2>;
  }

  return (
    <div className="resort-list">
      {eventHall.map((resort) => (
        <div className="resort-details" key={resort.id}>
          <div className="top-section">
            <div className="gallery">
              <div className="main-image">
                <img
                  src={resort.main_image}
                  alt={resort.name}
                />
              </div>
              <div className="side-images">

                <img
                  src={resort.images[0]}
                  alt={resort.name}
                />

                <img
                  src={resort.images[1]}
                  alt={resort.name}
                />
              </div>
            </div>
            {/* card sections for reserve */}
            <div className="booking-card">
              <h2>₹{resort.price}
                <span> / day</span>
              </h2>
              <label>Check In</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
              <label>Check Out</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
              <label>Guests</label>
              <input type="number" placeholder="Enter number of guests" onChange={(e) => setGuests(e.target.value)} required/>
              <button onClick={() => handleBooking(resort)}>Reserve Now</button>
              <p>You won't charged </p>
            </div>
          </div>
          <div className="details">
            <h1>{resort.name}</h1>
            <div className="info">
              <span>📍 {resort.location}</span>
              <span>⭐ {resort.rating}</span>
              <span>{resort.type}</span>
              <span>👤 {resort.capacity} Guests</span>
            </div>
            <p>{resort.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResortDetails;