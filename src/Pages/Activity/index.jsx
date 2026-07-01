import "./index.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activityDate, setActivityDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const user_id = localStorage.getItem("user_id");
  const cardsPerPage = 6;

  useEffect(() => {
    axios
      .get("http://localhost:3000/activities")
      .then((res) => { setActivities(res.data); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  }, []);

  useEffect(()=>{
    console.log(activities); 
  }, [activities])

  const handleBooking = (activity) => {
    if (!activityDate) { alert("Please select an activity date"); return; }
    axios
      .post("http://localhost:3000/activity_carts", {
        user_id, activityId: activity.id, activityName: activity.name, date: activityDate, guests,
      })
      .then(() => { alert("Activity booked successfully!"); setActivityDate(""); setGuests(1); })
      .catch(console.error);
  };

  const lastCard = currentPage * cardsPerPage;
  const firstCard = lastCard - cardsPerPage;
  const currentActivities = activities.slice(firstCard, lastCard);
  const totalPages = Math.ceil(activities.length / cardsPerPage);

  if (loading) return <h2 style={{ textAlign: "center", padding: "80px" }}>Loading...</h2>;

  return (
    <div className="activity-page">

      <div className="hero-section">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Luxury isn't just where you stay — it's what you experience.</h1>
          <button>Begin Your Journey</button>
        </div>
      </div>

      <div className="activity-container">
        <h2>Signature Adventures</h2>

        <div className="activity-grid">
          {currentActivities.map((activity) => (
            <div className="activity-card" key={activity.id}>

              <div className="card-image-wrap">
                <img src={activity.main_image} alt={activity.name} />
                <span className="price-pill">₹{activity.price} / person</span>
                <span className="rating-pill">
                  <span className="star">★</span> {activity.rating}
                </span>
              </div>

              <div className="card-body">
                <div className="card-location">
                  <i className="bi bi-geo-alt"></i>
                  <span>{activity.location.join(", ")}</span>
                </div>
                <h3>{activity.name}</h3>
                <p className="desc">{activity.description.substring(0, 90)}...</p>
              </div>

              <div className="card-tags">
                {activity.tags?.slice(0, 3).map((tag, i) => (
                  <span className="tag" key={i}>{tag}</span>
                ))}
              </div>

              <div className="card-divider"></div>

              <div className="card-form">
                <div className="field-row">
                  <div className="field">
                    <label>Activity date</label>
                    <input type="date" value={activityDate} onChange={(e) => setActivityDate(e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Guests</label>
                    <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                    </select>
                  </div>
                </div>
                <button className="book-btn" onClick={() => handleBooking(activity)}>
                  <i className="bi bi-stars"></i>
                  Book Experience
                </button>
              </div>

            </div>
          ))}
        </div>

        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        </div>
      </div>

    </div>
  );
};

export default Activity;