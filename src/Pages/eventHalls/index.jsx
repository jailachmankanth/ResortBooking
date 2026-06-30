import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";
import axios from "axios";

function EventHalls() {
  const [search, setSearch] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const [eventHallsData, setEventHallsData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filterLocation, setFilterLocation] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortValue, setSortValue] = useState(0);

  useEffect(() => {
    async function fetchEventHalls() {
      try {
        const res = await axios.get(
          "http://localhost:3000/eventHalls"
        );

        setEventHallsData(res.data);

        const uniqueLocations = [
          ...new Set(
            res.data.map((item) => item.location)
          ),
        ];

        setLocations(uniqueLocations);
      } catch (error) {
        console.error(error);
      }
    }

    fetchEventHalls();
  }, []);

  useEffect(() => {
    let filteredData = eventHallsData.filter((item) => {
      const matchesSearch =
        item.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesLocation =
        filterLocation === "" ||
        item.location === filterLocation;

      const matchesRating =
        item.rating >= selectedRating;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesRating
      );
    });

    if (sortValue == 1) {
      filteredData.sort(
        (a, b) => a.price - b.price
      );
    } else if (sortValue == 2) {
      filteredData.sort(
        (a, b) => b.price - a.price
      );
    }

    setOriginalData(filteredData);
  }, [
    eventHallsData,
    search,
    filterLocation,
    selectedRating,
    sortValue,
  ]);

  function handleLocation(e) {
    setFilterLocation(e.target.value);
  }

  function handleSort(e) {
    setSortValue(Number(e.target.value));
  }

  return (
    <div className="resorts-page">
      {/* Header */}
      <div className="page-header">
        <h1>Find Your Perfect Event Hall</h1>
        <p>
          Discover premium event halls for
          weddings, receptions, corporate
          meetings, and special celebrations.
        </p>
      </div>

      <div className="content-wrapper">
        {/* Filters */}
        <aside className="filter-section">
          <h3>Filters</h3>

          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search event hall..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="filter-group">
            <label>Location</label>

            <select
              value={filterLocation}
              onChange={handleLocation}
            >
              <option value="">
                All Locations
              </option>

              {locations.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Minimum Rating</label>

            <div className="ratings">
              <button
                className={
                  selectedRating === 4
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSelectedRating(
                    selectedRating === 4
                      ? 0
                      : 4
                  )
                }
              >
                4+
              </button>

              <button
                className={
                  selectedRating === 4.5
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSelectedRating(
                    selectedRating === 4.5
                      ? 0
                      : 4.5
                  )
                }
              >
                4.5+
              </button>

              <button
                className={
                  selectedRating === 5
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setSelectedRating(
                    selectedRating === 5
                      ? 0
                      : 5
                  )
                }
              >
                5.0
              </button>
            </div>
          </div>
        </aside>

        {/* Event Hall Cards */}
        <section className="resorts-list">
          <div className="top-bar">
            <p>
              Showing {originalData.length} Event
              Halls
            </p>

            <select
              value={sortValue}
              onChange={handleSort}
            >
              <option value={0}>
                Recommended
              </option>
              <option value={1}>
                Price Low to High
              </option>
              <option value={2}>
                Price High to Low
              </option>
            </select>
          </div>

          {originalData.length === 0 ? (
            <h1 className="zero-tag">
              No Event Halls Found
            </h1>
          ) : (
            originalData.map((item) => (
              <div
                className="resort-card"
                key={item.id}
              >
                <div className="resort-image">
                  <img
                    src={item.main_image}
                    alt={item.name}
                  />

                  <div className="rating-badge">
                    <FaStar />
                    {item.rating}/5.0 (
                    {item.reviews})
                  </div>
                </div>

                <div className="resort-info">
                  <h2>{item.name}</h2>

                  <p className="location">
                    <FaMapMarkerAlt />
                    {item.location}
                  </p>

                  <p className="description">
                    {item.description}
                  </p>

                  <div className="price-row">
                    <div>
                      <small>
                        STARTING FROM
                      </small>

                      <h3>
                        ₹{item.price}
                        <span>
                          {" "}
                          / booking
                        </span>
                      </h3>
                    </div>

                    <Link
                      to={`/eventhall/${item.id}`}
                    >
                      <button className="details-btn">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}

export default EventHalls;