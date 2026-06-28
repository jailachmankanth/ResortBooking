import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

import {
  MdOutlineWorkspacePremium,
  MdTravelExplore,
  MdRoomService,
  MdAccessTime,
} from "react-icons/md";

import "./Footer.scss";

/* ==========================
   Navigation Links
========================== */

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Rooms & Suites", href: "/resorts" },
  { label: "Activities", href: "/activities" },
  { label: "Event Halls", href: "/eventhalls" },
  { label: "Gallery", href: "/gallery" },
];

const supportLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cancellation Policy", href: "/cancellation" },
];

/* ==========================
   Social Links
========================== */

const socialLinks = [
  {
    icon: <FaFacebookF />,
    href: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: <FaInstagram />,
    href: "https://instagram.com",
    label: "Instagram",
  },
  {
    icon: <FaWhatsapp />,
    href: "https://wa.me/919999999999",
    label: "WhatsApp",
  },
  {
    icon: <FaYoutube />,
    href: "https://youtube.com",
    label: "YouTube",
  },
];

/* ==========================
   Luxury Guest Services
========================== */

const guestServices = [
  {
    icon: <MdOutlineWorkspacePremium />,
    lines: ["Luxury Hospitality", "Premium Guest Experience"],
  },
  {
    icon: <MdTravelExplore />,
    lines: ["Exclusive Destinations", "Curated Luxury Escapes"],
  },
  {
    icon: <MdRoomService />,
    lines: ["24/7 Concierge", "Personalized Services"],
  },
  {
    icon: <MdAccessTime />,
    lines: ["Always Available", "World-Class Hospitality"],
  },
];

/* ==========================
   Components
========================== */

const NavLink = ({ href, children }) => (
  <li>
    <Link to={href} className="footer__nav-link">
      <span className="footer__nav-link-inner">
        {children}
      </span>
    </Link>
  </li>
);

const GoldDivider = ({ className = "" }) => (
  <div className={`footer__divider ${className}`}>
    <span className="footer__divider-line" />
    <span className="footer__divider-gem">◆</span>
    <span className="footer__divider-line" />
  </div>
);
const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("footer--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    if (footerRef.current) observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="footer" ref={footerRef}>

      {/* Hero */}
      <div className="footer__hero">
        <div className="footer__hero-inner">

          <div className="footer__crown">
            <span className="footer__crown-bar" />
            <span className="footer__crown-icon">♛</span>
            <span className="footer__crown-bar" />
          </div>

          <div className="footer__brand">
            <span className="footer__brand-the">THE</span>
            <h2 className="footer__brand-name">GRANDORIA</h2>
            <span className="footer__brand-collection">COLLECTION</span>
          </div>

          <p className="footer__tagline">
            Luxury Escapes. Timeless Experiences.
          </p>

          <GoldDivider />
        </div>
      </div>

      {/* Grid */}
      <div className="footer__grid-wrapper">
        <div className="footer__grid">

          {/* Brand */}
          <div className="footer__col">
            <div className="footer__glass-card">

              <h3 className="footer__col-heading footer__col-heading--brand">
                The Grandoria Collection
              </h3>

              <p className="footer__brand-desc">
                Experience refined luxury, exceptional hospitality,
                and unforgettable stays crafted for modern travellers
                seeking timeless elegance.
              </p>

              <div className="footer__socials">

                {socialLinks.map(({ icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="footer__social-icon"
                  >
                    {icon}
                  </a>
                ))}

              </div>

            </div>
          </div>

          {/* Explore */}

          <div className="footer__col">

            <h3 className="footer__col-heading">Explore</h3>

            <ul className="footer__nav-list">

              {exploreLinks.map((item) => (
                <NavLink key={item.label} href={item.href}>
                  {item.label}
                </NavLink>
              ))}

            </ul>

          </div>

          {/* Support */}

          <div className="footer__col">

            <h3 className="footer__col-heading">Support</h3>

            <ul className="footer__nav-list">

              {supportLinks.map((item) => (
                <NavLink key={item.label} href={item.href}>
                  {item.label}
                </NavLink>
              ))}

            </ul>

          </div>

          {/* Guest Services */}

          <div className="footer__col">

            <h3 className="footer__col-heading">
              Guest Services
            </h3>

            <ul className="footer__contact-list">

              {guestServices.map((service, index) => (

                <li
                  key={index}
                  className="footer__contact-item"
                >

                  <span className="footer__contact-icon">
                    {service.icon}
                  </span>

                  <span className="footer__contact-text">

                    {service.lines.map((line, i) => (
                      <span
                        key={i}
                        className="footer__contact-line"
                      >
                        {line}
                      </span>
                    ))}

                  </span>

                </li>

              ))}

            </ul>

          </div>

        </div>
      </div>      {/* Bottom Footer */}
      <div className="footer__bottom-wrapper">

        <GoldDivider className="footer__bottom-divider" />

        <div className="footer__bottom">

          <p className="footer__copyright">
            ©️ {new Date().getFullYear()} The Grandoria Collection.
            All Rights Reserved.
          </p>

          <p className="footer__credit">
            Crafted with Excellence • Luxury Hospitality Experience
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;