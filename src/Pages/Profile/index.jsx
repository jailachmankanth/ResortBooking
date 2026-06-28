import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './index.scss'

const BASE_URL = 'http://localhost:3000'

const Profile = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [profileDetails, setProfileDetails]       = useState([])
  const [bookingDetails, setBookingDetails]       = useState([])
  const [resortDetails, setResortDetails]         = useState([])
  const [bookedResorts, setBookedResorts]         = useState([])
  const [activityDetails, setActivityDetails]     = useState([])
  const [activityBookings, setActivityBookings]   = useState([])
  const [bookedActivities, setBookedActivities]   = useState([])
  const [eventHallDetails, setEventHallDetails]   = useState([])
  const [eventHallBookings, setEventHallBookings] = useState([])
  const [bookedEventHalls, setBookedEventHalls]   = useState([])
  const [activeTab, setActiveTab]                 = useState('resorts')
  const [loading, setLoading]                     = useState(true)
  const [error, setError]                         = useState(null)
  const [showConfirm, setShowConfirm]             = useState(false)
  const [pendingRemove, setPendingRemove]         = useState(null)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true)
        const [profileRes, bookingRes, resortRes, activityRes, activityBookingRes, eventHallRes, eventHallBookingRes] = await Promise.all([
          axios.get(`${BASE_URL}/profiles?id=${id}`),
          axios.get(`${BASE_URL}/resort_bookings?user_id=${id}`),
          axios.get(`${BASE_URL}/resorts`),
          axios.get(`${BASE_URL}/activities`),
          axios.get(`${BASE_URL}/activities_booking?user_id=${id}`),
          axios.get(`${BASE_URL}/eventHalls`),
          axios.get(`${BASE_URL}/eventhall_booking?user_id=${id}`),
        ])
        setProfileDetails(profileRes.data)
        setBookingDetails(bookingRes.data)
        setResortDetails(resortRes.data)
        setActivityDetails(activityRes.data)
        setActivityBookings(activityBookingRes.data)
        setEventHallDetails(eventHallRes.data)
        setEventHallBookings(eventHallBookingRes.data)
      } catch (err) {
        setError('Failed to load profile. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [id])

  useEffect(() => {
    if (bookingDetails.length === 0 || resortDetails.length === 0) return
    setBookedResorts(bookingDetails.map(b => ({ ...b, resort: resortDetails.find(r => r.id === b.resort_id) })))
  }, [bookingDetails, resortDetails])

  useEffect(() => {
    if (activityBookings.length === 0 || activityDetails.length === 0) return
    setBookedActivities(activityBookings.map(b => ({ ...b, activity: activityDetails.find(a => a.id === b.activity_id) })))
  }, [activityBookings, activityDetails])

  useEffect(() => {
    if (eventHallBookings.length === 0 || eventHallDetails.length === 0) return
    setBookedEventHalls(eventHallBookings.map(b => ({ ...b, hall: eventHallDetails.find(h => h.id === b.hall_id) })))
  }, [eventHallBookings, eventHallDetails])

  const capitalizeName = (name) => {
    if (!name) return 'Guest User'
    return name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '—'
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const formatAmount = (amount) => {
    if (!amount) return '—'
    return `₹${Number(amount).toLocaleString('en-IN')}`
  }

  const getStatus = (checkOut, status) => {
    if (status === 'cancelled') return 'Cancelled'
    return new Date(checkOut) >= new Date() ? 'Upcoming' : 'Completed'
  }

  const handleLogout = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('accessToken')
    navigate('/')
  }

  const askRemove = (bookingId, type) => {
    setPendingRemove({ id: bookingId, type })
    setShowConfirm(true)
  }

  const confirmRemove = async () => {
    const endpointMap = { resort: 'resort_bookings', activity: 'activities_booking', eventhall: 'eventhall_booking' }
    try {
      await axios.delete(`${BASE_URL}/${endpointMap[pendingRemove.type]}/${pendingRemove.id}`)
      if (pendingRemove.type === 'resort')    setBookedResorts(prev => prev.filter(b => b.id !== pendingRemove.id))
      if (pendingRemove.type === 'activity')  setBookedActivities(prev => prev.filter(b => b.id !== pendingRemove.id))
      if (pendingRemove.type === 'eventhall') setBookedEventHalls(prev => prev.filter(b => b.id !== pendingRemove.id))
    } catch {
      alert('Failed to remove booking. Please try again.')
    } finally {
      setShowConfirm(false)
      setPendingRemove(null)
    }
  }

  const cancelRemove = () => {
    setShowConfirm(false)
    setPendingRemove(null)
  }

  const BookingCard = ({ booking, type, imageSrc, name, location, checkIn, checkOut, amount, status }) => (
    <div className="reservation-card">
      <div className="card-image-wrap">
        <img src={imageSrc || '/placeholder-resort.jpg'} alt={name} />
        <span className={`status-badge status-badge--${status.toLowerCase()}`}>{status}</span>
      </div>
      <div className="card-details">
        <div className="card-top-row">
          <h2 className="resort-name">{name || 'N/A'}</h2>
          <p className="resort-location">
            <i className="bi bi-geo-alt"></i>
            {location || 'Location'}
          </p>
        </div>
        <div className="date-row">
          <div className="date-box">
            <span className="date-label">Check-in</span>
            <span className="date-value">{formatDate(checkIn)}</span>
          </div>
          <div className="date-box">
            <span className="date-label">Check-out</span>
            <span className="date-value">{formatDate(checkOut)}</span>
          </div>
        </div>
        <div className="card-bottom-row">
          <div className="amount-block">
            <span className="amount-label">Total Amount</span>
            <span className="amount-value">{formatAmount(amount)}</span>
          </div>
          <button className="action-btn action-btn--remove" onClick={() => askRemove(booking.id, type)}>
            <i className="bi bi-trash3"></i> Remove
          </button>
        </div>
      </div>
    </div>
  )

  const EmptyState = ({ label, route }) => (
    <div className="no-reservations">
      <i className="bi bi-calendar-x"></i>
      <h3>No {label} booked yet</h3>
      <p>Your {label.toLowerCase()} bookings will appear here after you complete a purchase.</p>
      <button onClick={() => navigate(route)}>Explore {label}</button>
    </div>
  )

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Loading your profile...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="profile-error">
        <i className="bi bi-exclamation-triangle"></i>
        <h3>Something went wrong</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    )
  }

  return (
    <div className="profile-page">

      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <div className="confirm-icon">
              <i className="bi bi-exclamation-circle"></i>
            </div>
            <h3>Remove Booking?</h3>
            <p>Are you sure you want to remove this booking? This action cannot be undone.</p>
            <div className="confirm-actions">
              <button className="confirm-btn confirm-btn--yes" onClick={confirmRemove}>Yes, Remove</button>
              <button className="confirm-btn confirm-btn--no" onClick={cancelRemove}>No, Keep It</button>
            </div>
          </div>
        </div>
      )}

      <aside className="profile-sidebar">
        <div className="sidebar-avatar">
          <i className="bi bi-person-fill"></i>
        </div>
        <h2 className="sidebar-name">{capitalizeName(profileDetails[0]?.user_name)}</h2>
        <span className="membership-badge">★ Premium Member</span>
        <button className="edit-profile-btn" onClick={() => navigate('/edit-profile')}>Edit Profile</button>
        <div className="sidebar-divider"></div>
        <nav className="sidebar-nav">
          <button className={`sidebar-nav-item ${activeTab === 'resorts' ? 'active' : ''}`} onClick={() => setActiveTab('resorts')}>
            <i className="bi bi-houses-fill"></i>
            <span>Resorts</span>
          </button>
          <button className={`sidebar-nav-item ${activeTab === 'activities' ? 'active' : ''}`} onClick={() => setActiveTab('activities')}>
            <i className="bi bi-joystick"></i>
            <span>Activities</span>
          </button>
          <button className={`sidebar-nav-item ${activeTab === 'eventhalls' ? 'active' : ''}`} onClick={() => setActiveTab('eventhalls')}>
            <i className="bi bi-building"></i>
            <span>Event Halls</span>
          </button>
        </nav>
        <div className="sidebar-divider"></div>
        <button className="logout-btn" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i>
          <span>Logout</span>
        </button>
      </aside>

      <main className="profile-content">
        <section className="reservations-section">
          <div className="reservations-header">
            <h1>My Reservations</h1>
            <p>Manage your upcoming stays and view past experiences.</p>
          </div>
          <div className="reservations-divider"></div>

          {activeTab === 'resorts' && (
            bookedResorts.length === 0 ? <EmptyState label="Resorts" route="/resorts" /> :
            bookedResorts.map(booking => (
              <BookingCard
                key={booking.id}
                booking={booking}
                type="resort"
                imageSrc={booking.resort?.main_image}
                name={booking.resort?.name}
                location={booking.resort?.location}
                checkIn={booking.check_in}
                checkOut={booking.check_out}
                amount={booking.resort?.price}
                status={getStatus(booking.check_out, booking.status)}
              />
            ))
          )}

          {activeTab === 'activities' && (
            bookedActivities.length === 0 ? <EmptyState label="Activities" route="/activities" /> :
            bookedActivities.map(booking => (
              <BookingCard
                key={booking.id}
                booking={booking}
                type="activity"
                imageSrc={booking.activity?.image}
                name={booking.activity?.name}
                location={booking.activity?.location}
                checkIn={booking.check_in}
                checkOut={booking.check_out}
                amount={booking.activity?.price}
                status={getStatus(booking.check_out, booking.status)}
              />
            ))
          )}

          {activeTab === 'eventhalls' && (
            bookedEventHalls.length === 0 ? <EmptyState label="Event Halls" route="/eventhalls" /> :
            bookedEventHalls.map(booking => (
              <BookingCard
                key={booking.id}
                booking={booking}
                type="eventhall"
                imageSrc={booking.hall?.image}
                name={booking.hall?.name}
                location={booking.hall?.location}
                checkIn={booking.check_in}
                checkOut={booking.check_out}
                amount={booking.hall?.price}
                status={getStatus(booking.check_out, booking.status)}
              />
            ))
          )}

        </section>
      </main>
    </div>
  )
}

export default Profile