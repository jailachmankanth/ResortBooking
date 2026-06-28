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

    // useEffect(()=>{
    //     console.log(locations);
    // }, [locations])

    function handleApply() {
        setAppleBtn(prev => !prev)
    }


    //     useEffect(() => {
    //         const temp = []
    //         const filterResorts = (search != "" || filterTags.length !== 0 || filterLocation != "") ? (
    //             resortsData.map((item, index) => {
    //                 if (item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()) || item.tags.some(tag => filterTags.includes(tag)) || item.location === filterLocation)
    //                 })) : resortsData


    //         if (filterResorts) {
    //             temp.push(item)
    //         }
    //     })
    // }
    // setOriginalData(temp)

    //     }, [search, applyBtn, filterTags, filterLocation])

    useEffect(() => {
        const temp = resortsData.filter(item => {
            const matchesSearch =
                search === "" || item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());

            const matchesTags =
                filterTags.length === 0 || item.tags.some(tag => filterTags.includes(tag));

            const matchesLocation =
                filterLocation === "" || item.location === filterLocation;

            return matchesSearch &&
                matchesTags &&
                matchesLocation;
        });

        const hasFilters = search !== "" || filterTags.length > 0 || filterLocation !== "";

        if (!hasFilters) {
            setOriginalData(resortsData);
        } else if (temp.length > 0) {
            setOriginalData(temp);
        } else if(temp.length === 0) {
            setOriginalData([])
        }

    }, [resortsData, search, filterTags, filterLocation]);

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

    // const renderingData = originalData.length !== 0 ? originalData : resortsData;
    // const renderingData = originalData.length !== 0 ? originalData : resortsData

    // useEffect(()=>{
    //     console.log(renderingData);  
    // }, [renderingData])

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
                            <button>4+</button>
                            <button>4.5+</button>
                            <button>5.0</button>
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

                    <button className="apply-btn" onClick={handleApply}>
                        Apply Filters
                    </button>
                </aside>

                {/* Resort Cards */}
                <section className="resorts-list">
                    <div className="top-bar">
                        <p>
                            Showing {originalData.length} premium stays
                        </p>

                        <select>
                            <option>Recommended</option>
                            <option>Price Low to High</option>
                            <option>Price High to Low</option>
                        </select>
                    </div>

                    {
                        originalData.length === 0 ? (<h1 className="zero-tag">No Resorts Found</h1>):

                        (originalData.map((item, index) => {
                            return (
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
                            )
                        }))
                    }
                </section>
            </div>
        </div>
    );
}

export default Resorts;