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
    const [originalData, setOriginalData] = useState([])
    const [resortsData, setResortsData] = useState([])
    const [tags, setTags] = useState([])
    const [locations, setLocations] = useState([])
    const [filterLocation, setFilterLocation] = useState("")
    const [filterTags, setFilterTags] = useState([])
    const [selectedRating, setSelectedRating] = useState(0)
    const [sortValue, setSortValue] = useState(0)

    useEffect(() => {
        async function fetchResorts(params) {
            await axios.get('http://localhost:3000/resorts')
                .then((res) => {
                    setResortsData(res.data)
                    res.data.map((item, index) => {
                        item.tags.map((tag, index) => {
                            setTags(prev => prev.includes(tag) ? prev : [...prev, tag]);
                        })
                        setLocations(prev => prev.includes(item.location) ? prev : [...prev, item.location])
                    })
                })
        }
        fetchResorts()
    }, [])

    function handleApply() {
        setAppleBtn(prev => !prev)
    }

    useEffect(() => {
        const temp = resortsData.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());

            const matchesTags = filterTags.length === 0 || item.tags.some(tag => filterTags.includes(tag));

            const matchesLocation = filterLocation === "" || item.location === filterLocation;

            const matchRating = item.rating >= selectedRating

            return matchesSearch &&
                matchesTags &&
                matchesLocation &&
                matchRating;
        });

        const hasFilters = search !== "" || filterTags.length > 0 || filterLocation !== "";

        if (!hasFilters) {
            if (sortValue == 0) {
                setOriginalData(resortsData);
            } else if (sortValue == 1) {
                const sortedResorts = [...resortsData].sort(
                    (a, b) => a.price - b.price
                );
                setOriginalData(sortedResorts);
            } else if (sortValue == 2) {
                const sortedResorts = [...resortsData].sort(
                    (a, b) => b.price - a.price
                );
                setOriginalData(sortedResorts);
            }
        } else if (temp.length > 0) {
            if (sortValue == 0) {
                setOriginalData(temp);
            } else if (sortValue == 1) {
                const sortedResorts = [...temp].sort(
                    (a, b) => a.price - b.price
                );
                setOriginalData(sortedResorts);
            } else if (sortValue == 2) {
                const sortedResorts = [...temp].sort(
                    (a, b) => b.price - a.price
                );
                setOriginalData(sortedResorts);
            }
        } else if (temp.length === 0) {
            setOriginalData([])
        }

    }, [resortsData, search, selectedRating, filterTags, filterLocation, sortValue]);

    function handleSelect(e) {
        const value = e.target.value
        if (e.target.checked) {
            setFilterTags(prev => [...prev, value])
        } else {
            setFilterTags(prev => prev.filter(tag => tag !== value))
        }
    }

    function handleLocation(e) {
        setFilterLocation(e.target.value);
    }

    function handleSort(e) {
        setSortValue(e.target.value)
    }

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

                        <select onChange={handleLocation}>
                            <option value="">All Destinations</option>
                            {
                                locations.map((item, index) => {
                                    return (
                                        <option key={item} value={item}>{item}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Minimum Rating</label>

                        <div className="ratings">
                            <button
                                className={selectedRating === 4 ? "active" : ""}
                                onClick={() => setSelectedRating(
                                    selectedRating === 4 ? 0 : 4
                                )}
                            >
                                4+
                            </button>

                            <button
                                className={selectedRating === 4.5 ? "active" : ""}
                                onClick={() => setSelectedRating(
                                    selectedRating === 4.5 ? 0 : 4.5
                                )}
                            >
                                4.5+
                            </button>

                            <button
                                className={selectedRating === 5 ? "active" : ""}
                                onClick={() => setSelectedRating(
                                    selectedRating === 5 ? 0 : 5
                                )}
                            >
                                5.0
                            </button>
                        </div>
                    </div>

                    <div className="filter-group">
                        <label>Activities</label>

                        <div className="checkboxes">
                            {
                                tags.map((item, index) => {
                                    return (
                                        <label key={item}>
                                            <input type="checkbox" value={item} onChange={handleSelect} />
                                            {item}
                                        </label>
                                    )
                                })
                            }
                        </div>
                    </div>
                </aside>

                {/* Resort Cards */}
                <section className="resorts-list">
                    <div className="top-bar">
                        <p>
                            Showing {originalData.length} premium stays
                        </p>

                        <select onChange={handleSort}>
                            <option value={0}>Recommended</option>
                            <option value={1}>Price Low to High</option>
                            <option value={2}>Price High to Low</option>
                        </select>
                    </div>

                    {
                        originalData.length === 0 ? (<h1 className="zero-tag">No Resorts Found</h1>) :

                            (originalData.map((item, index) => {
                                return (
                                    <div className="resort-card" key={item.id}>
                                        <div className="resort-image">
                                            <img
                                                src={item.main_image}
                                                alt={item.name}
                                            />

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
                                )
                            }))
                    }
                </section>
            </div>
        </div>
    );
}

export default Resorts;