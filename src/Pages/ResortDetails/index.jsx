import "./index.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResortDetails = () => {
  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState()
  const [userId, setUserId] = useState("")
  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`http://localhost:3000/resorts?id=${id}`)
      .then((response) => {

        const resortsArray = Object.values(response.data);

        setResorts(resortsArray);
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
      resort_id: resort.id,
      check_in: checkIn,
      check_out: checkOut,
      guests: guests,
    };

    axios.post("http://localhost:3000/resort_carts", cartData)
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

  if (resorts.length === 0) {
    return <h2>No Resort Found</h2>;
  }

  return (
    <div className="resort-list">
      {resorts.map((resort) => (
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
                <span> / night</span>
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
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
              </select>
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
            <div className="tags">
              {resort.tags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResortDetails;