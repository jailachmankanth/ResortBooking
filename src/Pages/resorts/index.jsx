import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import {
    FaSearch,
    FaMapMarkerAlt,
    FaStar,
    FaHeart,
} from "react-icons/fa";
import axios from "axios";

function Resorts() {
    const [search, setSearch] = useState("");
    const [resortsData, setResortsData] = useState([])

    useEffect(() => {
        async function fetchResorts(params) {
            await axios.get('http://localhost:3000/resorts')
                .then((res) => setResortsData(res.data))
        }
        fetchResorts()
    })

    const filteredResorts = resortsData.filter(
        (resort) =>
            resort.name.toLowerCase().includes(search.toLowerCase()) ||
            resort.location.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="resorts-page">
            {/* Heading */}
            <div className="page-header">
                <h1>Find Your Escape</h1>
                <p>
                    Discover premium luxury resorts tailored to your
                    perfect getaway.
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
                            placeholder="Search resort..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <label>Destination</label>

                        <select>
                            <option>All Destinations</option>
                            <option>Maldives</option>
                            <option>Bali</option>
                            <option>Santorini</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Minimum Rating</label>

                        <div className="ratings">
                            <button>4+</button>
                            <button>4.5+</button>
                            <button>5.0</button>
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Activities</label>

                        <div className="checkboxes">
                            <label>
                                <input type="checkbox" />
                                Spa & Wellness
                            </label>

                            <label>
                                <input type="checkbox" />
                                Private Pool
                            </label>

                            <label>
                                <input type="checkbox" />
                                Scuba Diving
                            </label>

                            <label>
                                <input type="checkbox" />
                                Fine Dining
                            </label>
                        </div>
                    </div>

                    <button className="apply-btn">
                        Apply Filters
                    </button>
                </aside>

                {/* Resort Cards */}
                <section className="resorts-list">
                    <div className="top-bar">
                        <p>
                            Showing {resortsData.length} premium stays
                        </p>

                        <select>
                            <option>Recommended</option>
                            <option>Price Low to High</option>
                            <option>Price High to Low</option>
                        </select>
                    </div>

                    {resortsData.map((item) => (
                        <div className="resort-card" key={item.id}>
                            <div className="resort-image">
                                <img
                                    src={item.main_image}
                                    alt={item.name}
                                />

                                <button className="wishlist">
                                    <FaHeart />
                                </button>

                                <div className="rating-badge">
                                    <FaStar />
                                    {item.rating}/5.0 ({item.reviews})
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

                                <div className="tags">
                  {item.tags.map((tag, index) => (
                    <span key={index}>{tag}</span>
                  ))}
                </div>

                                <div className="price-row">
                                    <div>
                                        <small>STARTING FROM</small>
                                        <h3>
                                            ₹{item.price}
                                            <span>/ night</span>
                                        </h3>
                                    </div>

                                    <Link to={`/resort/${item.id}`}><button className="details-btn">
                                        View Details
                                    </button></Link>


                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}

export default Resorts;