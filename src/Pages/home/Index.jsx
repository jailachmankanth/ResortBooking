import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

const Index = () => {
  return (
    <div className='landingmain'>
      <section className='hero'>
        <img src="../../../public/landing-p-img/landing page backdrop 1.jpg" />
        <div className='brandlogo'>
          <h1>The Grandoria Collections</h1>
          <p>“A world of grandeur, luxury, and exceptional experiences.”</p>
        </div>
      </section>
      <section className='offers'>
        <h3>Your Luxury Getaway Starts Here — Enjoy 20% Off</h3>
      </section>
      <section className='about'>
        <h1>Luxury Getaways. Exceptional Experiences. One Destination</h1>
        <p>From breathtaking resorts to extraordinary experiences, we bring you everything you need to create unforgettable luxury escapes</p>
      </section>
      <section className='featuresdetails'>
        <div className='fdcard1'>
          <i className="bi bi-houses-fill"></i>
          <h2>Luxury Resorts</h2>
          <p>Discover handpicked luxury resorts where comfort, elegance, and unforgettable escapes come together.</p>
          <div className='fdcard1-1'>
            <br />
            <i className="bi bi-check2"></i>Handpicked Premium Resorts
            <br />
            <i className="bi bi-check2"></i>Luxury Beyond Expectations
            <br />
            <i className="bi bi-check2"></i>World-Class Hospitality
          </div>
          <Link to={'/resorts'}><button>Explore Resorts</button></Link>
        </div>
        <div className='fdcard2'>
          <i className="bi bi-joystick"></i>
          <h2>Popular Activities</h2>
          <p>Explore exciting activities and curated adventures designed to turn every moment into a memorable experience.</p>
          <div className='fdcard1-2'>
            <br />
            <i className="bi bi-check2"></i>Unforgettable Adventures
            <br />
            <i className="bi bi-check2"></i>Curated for Every Traveler
            <br />
            <i className="bi bi-check2"></i>Premium Experience Guaranteed
          </div>
          <Link to={'/activities'}><button>Explore Activities</button></Link>
        </div>
        <div className='fdcard3'>
          <i className="bi bi-boombox"></i>
          <h2>Event Halls</h2>
          <p>Find elegant event halls crafted to host celebrations, gatherings, and unforgettable moments in style.</p>
          <div className='fdcard1-3'>
            <br />
            <i className="bi bi-check2"></i>Celebrate in Style
            <br />
            <i className="bi bi-check2"></i>Luxury Spaces for Events
            <br />
            <i className="bi bi-check2"></i>Crafted for Memorable Moments
          </div>
          <Link to={'/eventhalls'}><button>Explore Venues</button></Link>
        </div>
      </section>
      <section className='vipfeatures'>
        <h2>Exclusive Luxury Services</h2>
        <div className='smallcard1'>
          <h3>Luxury Car Rentals</h3>
          <p>Travel in style with premium vehicles designed for comfort, elegance, and seamless luxury transportation.</p>
          <div className='tags'>
            <span>Premium Fleet</span>
            <span>Chauffeur Driven</span>
            <span>24/7 Available</span>
            <span>Elite Travel</span>
          </div>
          <h4>Starting From ₹4,999/day</h4>
          <Link to={'/contact'}><button>Explore Cars</button></Link>
        </div>
        <div className='smallcard2'>
          <h3>Private Dining</h3>
          <p>Enjoy exclusive dining experiences with curated menus, romantic setups, and unforgettable culinary moments.</p>
          <div className='tags'>
            <span>Fine Dining</span>
            <span>Chef Curated</span>
            <span>Private Setup</span>
            <span>Luxury Ambience</span>
          </div>
          <h4>Starting From ₹2,999/person</h4>
          <Link to={'/contact'}><button>Reserve Table</button></Link>
        </div>
        <div className='smallcard3'>
          <h3>Spa & Wellness</h3>
          <p>Rejuvenate your body and mind with premium spa treatments and wellness experiences tailored for total relaxation.</p>
          <div className='tags'>
            <span>Luxury Spa</span>
            <span>Wellness Retreat</span>
            <span>Pure Relaxation</span>
            <span>Premium Care</span>
          </div>
          <h4>Starting From ₹3,499/session</h4>
          <Link to={'/contact'}><button>Book Spa</button></Link>
        </div>
        <div className='smallcard4'>
          <h3>VIP Experiences</h3>
          <p>Experience unmatched luxury with dedicated concierge services, personal assistance, exclusive privileges, and elite hospitality throughout your stay.</p>
          <div className='tags'>
            <span>VIP Access</span>
            <span>Private Concierge</span>
            <span>Elite Privileges</span>
            <span>Priority Service</span>
          </div>
          <h4>Starting From ₹14,999/package</h4>
          <Link to={'/contact'}><button>Unlock VIP Access</button></Link>
        </div>
      </section>
      <section className='whygrandoria'>
        <h2>Why Grandoria?</h2>
        <p className='subtitle'>
          At Grandoria, we redefine luxury travel by offering handpicked resorts,
          exclusive experiences, and world-class hospitality designed for unforgettable escapes.
        </p>

        <div className='whycontent'>
          <div className='whybox'>
            <i className="bi bi-gem"></i>
            <h3>Premium Luxury</h3>
            <p>Only the finest resorts and experiences make it to Grandoria.</p>
          </div>

          <div className='whybox'>
            <i className="bi bi-shield-check"></i>
            <h3>Trusted Booking</h3>
            <p>Secure and seamless bookings with complete peace of mind.</p>
          </div>

          <div className='whybox'>
            <i className="bi bi-stars"></i>
            <h3>Elite Experiences</h3>
            <p>From private dining to VIP concierge, luxury beyond expectations.</p>
          </div>

          <div className='whybox'>
            <i className="bi bi-headset"></i>
            <h3>24/7 Support</h3>
            <p>Dedicated support whenever you need assistance.</p>
          </div>
        </div>
      </section>

      <section className='gallerysection'>
        <h2>Luxury Experience Gallery</h2>
        <div className='gallerygrid'>
          <img src="/landing-p-img/gallery resort.jpg" alt="resort" />
          <img src="/landing-p-img/gallery pool.jpg" alt="pool" />
          <img src="/landing-p-img/gallery dining.avif" alt="dining" />
          <img src="/landing-p-img/gallery spa.jpg" alt="spa" />
        </div>
      </section>

      <section className='reviews'>
        <h2>What Our Guests Say</h2>

        <div className='reviewgrid'>
          <img src="../../../public/landing-p-img/review-1.png" alt="review1" />
          <img src="../../../public/landing-p-img/review-2.png" alt="review2" />
          <img src="../../../public/landing-p-img/review-3.png" alt="review3" />
        </div>
      </section>
    </div>
  )
}

export default Index
