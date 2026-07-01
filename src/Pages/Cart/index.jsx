import React, { use, useEffect, useState } from 'react'
import axios from 'axios'
import './style.scss'
import { useNavigate } from 'react-router-dom'

const BASE_URL = 'http://localhost:3000'

const Cart = () => {
  const userId = localStorage.getItem('user_id')
  const [cartItems, setCartItems] = useState([])
  const [resortCart, setResortCart] = useState([])
  const [activityCart, setActivityCart] = useState([])
  const [evenHallCart, setEventHallCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [pendingRemove, setPendingRemove] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchCartData = async () => {
      try {
        setLoading(true)
        const [
          resortCartsRes, resortsRes,
          activityCartsRes, activitiesRes,
          eventHallCartsRes, eventHallsRes
        ] = await Promise.all([
          axios.get(`${BASE_URL}/resort_carts?user_id=${userId}`),
          axios.get(`${BASE_URL}/resorts`),
          axios.get(`${BASE_URL}/activity_carts?user_id=${userId}`),
          axios.get(`${BASE_URL}/activities`),
          axios.get(`${BASE_URL}/eventhall_carts?user_id=${userId}`),
          axios.get(`${BASE_URL}/eventHalls`)
        ])

        setResortCart(resortCartsRes.data)
        setActivityCart(activityCartsRes.data)
        setEventHallCart(eventHallCartsRes.data)

        const resortsMap = new Map(resortsRes.data.map(r => [r.id, r]))
        const activitiesMap = new Map(activitiesRes.data.map(a => [a.id, a]))
        const eventHallsMap = new Map(eventHallsRes.data.map(e => [e.id, e]))

        const formattedResorts = resortCartsRes.data.map(cart => {
          const detail = resortsMap.get(cart.resort_id)
          return { ...cart, detail, type: 'resort_carts' }
        }).filter(item => item.detail)

        const formattedActivities = activityCartsRes.data.map(cart => {
          const aId = cart.activityId || cart.activity_id
          const detail = activitiesMap.get(aId)
          return { ...cart, detail, type: 'activity_carts' }
        }).filter(item => item.detail)

        const formattedEventHalls = eventHallCartsRes.data.map(cart => {
          const eId = cart.eventHall_id || cart.eventhall_id
          const detail = eventHallsMap.get(eId)
          return { ...cart, detail, type: 'eventhall_carts' }
        }).filter(item => item.detail)

        setCartItems([...formattedResorts, ...formattedActivities, ...formattedEventHalls])
      } catch (err) {
        setError('Failed to load cart data.')
      } finally {
        setLoading(false)
      }
    }
    fetchCartData()
  }, [userId])

  // Triggers the modal instead of deleting immediately
  const askRemove = (id, type) => {
    setPendingRemove({ id, type })
    setShowConfirm(true)
  }

  // Executes the deletion after confirmation
  const confirmRemove = async () => {
    if (!pendingRemove) return
    const { id, type } = pendingRemove

    try {
      await axios.delete(`${BASE_URL}/${type}/${id}`)
      setCartItems(prev => prev.filter(item => !(item.id === id && item.type === type)))
    } catch {
      alert('Failed to remove item. Please try again.')
    } finally {
      setShowConfirm(false)
      setPendingRemove(null)
    }
  }

  // Cancels the deletion
  const cancelRemove = () => {
    setShowConfirm(false)
    setPendingRemove(null)
  }

  const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 1
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 1
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount)
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return `${date.toLocaleString('en-US', { month: 'short' })} ${date.getDate()}`
  }

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.detail.price || 0
    let multiplier = 1
    if (item.type === 'resort_carts' || item.type === 'eventhall_carts') {
      multiplier = calculateNights(item.check_in, item.check_out)
    }
    return acc + (price * multiplier)
  }, 0)

  const taxesAndFees = subtotal * 0.15
  const extraFee = cartItems.length > 0 ? 1000 : 0
  const total = subtotal + taxesAndFees + extraFee

  async function handleProceed() {
    try {
      await Promise.all([
        ...resortCart.map(item =>
          axios.post(`${BASE_URL}/resort_bookings`, {
            user_id: userId,
            resort_id: item.resort_id,
            check_in: item.check_in,
            check_out: item.check_out,
            guests: item.guests
          })
        ),

        ...activityCart.map(item =>
          axios.post(`${BASE_URL}/activity_bookings`, {
            user_id: userId,
            activity_id: item.activityId,
            date: item.date,
            guests: item.guests
          })
        ),

        ...evenHallCart.map(item =>
          axios.post(`${BASE_URL}/eventhall_bookings`, {
            user_id: userId,
            eventhall_id: item.eventhall_id,
            check_in: item.check_in,
            check_out: item.check_out,
            guests: item.guests
          })
        )
      ])

      await Promise.all([
        ...resortCart.map(item =>
          axios.delete(`${BASE_URL}/resort_carts/${item.id}`)
        ),
        ...activityCart.map(item =>
          axios.delete(`${BASE_URL}/activity_carts/${item.id}`)
        ),
        ...evenHallCart.map(item =>
          axios.delete(`${BASE_URL}/eventhall_carts/${item.id}`)
        )
      ])

      navigate('/success')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="cart-page">

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <div className="confirm-icon">
              <i className="bi bi-exclamation-circle"></i>
            </div>
            <h3>Remove Item?</h3>
            <p>Are you sure you want to remove this from your selection?</p>
            <div className="confirm-actions">
              <button className="confirm-btn confirm-btn--yes" onClick={confirmRemove}>Yes, Remove</button>
              <button className="confirm-btn confirm-btn--no" onClick={cancelRemove}>No, Keep It</button>
            </div>
          </div>
        </div>
      )}

      <main className="cart-main">
        <section className="cart-title-section">
          <h1>Your Selection</h1>
          <p>Review your luxury stays before proceeding to finalize your reservation.</p>
        </section>

        {loading ? (
          <div className="loader">Loading your selection...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="cart-container">
            <div className="cart-items-list">
              {cartItems.length === 0 ? (
                <div className="empty-cart">Your cart is empty.</div>
              ) : (
                cartItems.map((item) => {
                  const isDateRange = item.type === 'resort_carts' || item.type === 'eventhall_carts'
                  const displayDate = isDateRange
                    ? `${formatDate(item.check_in)} - ${formatDate(item.check_out)}`
                    : formatDate(item.date)

                  const multiplier = isDateRange ? calculateNights(item.check_in, item.check_out) : 1
                  const itemTotal = item.detail.price * multiplier

                  return (
                    <div className="cart-item-card" key={`${item.type}-${item.id}`}>
                      <div className="item-image">
                        <img src={item.detail.main_image} alt={item.detail.name} />
                      </div>
                      <div className="item-details">
                        <div className="item-header">
                          <h2>{item.detail.name}</h2>
                          <button className="remove-btn" onClick={() => askRemove(item.id, item.type)}>
                            <i className="bi bi-x-lg"></i>
                          </button>
                        </div>
                        <p className="item-location">
                          <i className="bi bi-geo-alt"></i> {item.detail.location}
                        </p>

                        <div className="item-meta">
                          <div className="meta-block">
                            <span className="meta-label">DATES</span>
                            <span className="meta-value">{displayDate}</span>
                          </div>
                          <div className="meta-block">
                            <span className="meta-label">GUESTS</span>
                            <span className="meta-value">
                              {item.guests} {item.guests === '1' || item.guests === 1 ? 'Guest' : 'Guests'}
                            </span>
                          </div>
                        </div>

                        <div className="item-footer">
                          <button className="edit-btn">
                            <i className="bi bi-pencil"></i> Edit Details
                          </button>
                          <div className="price-info">
                            <span className="price-per-night">{formatCurrency(item.detail.price)} / {isDateRange ? 'day' : 'activity'}</span>
                            <span className="price-total">{formatCurrency(itemTotal)} total</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            <aside className="cart-summary-sidebar">
              <div className="summary-card">
                <h3>Booking Summary</h3>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Taxes & Fees (15%)</span>
                  <span>{formatCurrency(taxesAndFees)}</span>
                </div>
                <div className="summary-row">
                  <span>Resort Fee</span>
                  <span>{formatCurrency(extraFee)}</span>
                </div>

                <div className="summary-total">
                  <div>
                    <span className="total-label">Total</span>
                  </div>
                  <div className="total-right">
                    <span className="total-amount">{formatCurrency(total)}</span>
                    <span className="total-note">Includes all taxes and fees</span>
                  </div>
                </div>

                <button className="checkout-btn" disabled={cartItems.length === 0} onClick={handleProceed}>
                  Proceed to Checkout <i className="bi bi-arrow-right"></i>
                </button>
                <p className="secure-note">
                  Secure payment processing powered by Aura Trust.
                </p>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  )
}

export default Cart