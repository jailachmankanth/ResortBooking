import "./index.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const ResortDetails = () => {
  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:3001/data")
      .then((response) => {
        
        const resortsArray =Object.values(response.data.resorts);

        setResorts(resortsArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleBooking = (resort) => {
    if(!checkIn || !checkOut){
      alert("Please Select The CheckIn and CheckOut Dates.")
      return;
    }

  const bookingData = {
    resortId: resort.id,
    resortName: resort.name,
    checkIn,
    checkOut,
    guests,
    price: resort.price
  };

  axios.post("http://localhost:3001/carts", bookingData)
    .then(() => {
      alert("Booking Successful!");
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
            onChange={(e)=> setCheckIn(e.target.value)}
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
            onChange={(e)=>setGuests(e.target.value)}
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
            </select>
            <button onClick={()=>handleBooking(resort)}>Reserve Now</button>
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