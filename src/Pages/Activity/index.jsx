import "./index.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activityDate, setActivityDate] = useState("");
  const [guests, setGuests] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const user_id = localStorage.getItem("user_id")

  const cardsPerPage = 6;

  useEffect(() => {
    axios
      .get("http://localhost:3000/activities")
      .then((response) => {
        setActivities(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleBooking = (activity) => {
    if (!activityDate) {
      alert("Please Select Activity Date");
      return;
    }

    const bookingData = {
      user_id: user_id,
      activity_id: activity.id,
      activityName: activity.name,
      date: activityDate,
      guests
    };

    axios
      .post("http://localhost:3000/activity_carts", bookingData)
      .then(() => {
        alert("Activity Booked Successfully!");
        setActivityDate("");
        setGuests(1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const lastCard = currentPage * cardsPerPage;
  const firstCard = lastCard - cardsPerPage;

  const currentActivities = activities.slice(firstCard, lastCard);

  const totalPages = Math.ceil(activities.length / cardsPerPage);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="activity-page">

      <div className="hero-section">
        <div className="overlay"></div>

        <div className="hero-content">
          <h1>Unforgettable Experiences</h1>
          <button>Explore Collections</button>
        </div>
      </div>

      <div className="activity-container">

        <h2>Signature Adventures</h2>

        <div className="activity-grid">

          {currentActivities.map((activity) => (
            <div className="activity-card" key={activity.id}>

              <img
                src={activity.main_image}
                alt={activity.name}
              />

              <div className="card-content">

                <h3>{activity.name}</h3>

                <p className="price">
                  ₹{activity.price} / Person
                </p>

                <p className="location">
                  📍 {activity.location.join(", ")}
                </p>

                <p className="rating">
                  ⭐ {activity.rating}
                </p>

                <p className="desc">
                  {activity.description.substring(0, 90)}...
                </p>

                <label>Select Date</label>

                <input
                  type="date"
                  value={activityDate}
                  onChange={(e) =>
                    setActivityDate(e.target.value)
                  }
                />

                <label>Guests</label>

                <select
                  value={guests}
                  onChange={(e) =>
                    setGuests(e.target.value)
                  }
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                </select>

                <button
                  className="book-btn"
                  onClick={() =>
                    handleBooking(activity)
                  }
                >
                  Book Experience
                </button>

              </div>
            </div>
          ))}

        </div>

        <div className="pagination">

          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(currentPage - 1)
            }
          >
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage(currentPage + 1)
            }
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
};

export default Activity;