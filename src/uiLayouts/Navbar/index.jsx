import { NavLink } from "react-router-dom";
import {
  FaShoppingCart,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import "./style.scss";

const Navbar = () => {
  const Id = localStorage.getItem("user_id");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <img className="nav-logo" src="logo.png" alt="" />
      {/* <h1 className="logo">TGC</h1> */}

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li>
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/resorts" onClick={() => setMenuOpen(false)}>
            Resorts
          </NavLink>
        </li>

        <li>
          <NavLink to="/activities" onClick={() => setMenuOpen(false)}>
            Activities
          </NavLink>
        </li>

        <li>
          <NavLink to="/eventhalls" onClick={() => setMenuOpen(false)}>
            Event Halls
          </NavLink>
        </li>

        <li>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </NavLink>
        </li>
      </ul>

      <div className="nav-icons">
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "cart-icon active" : "cart-icon"
          }
        >
          <FaShoppingCart />
        </NavLink>

        <NavLink to={`/profile/${Id}`}>
          <FaUserCircle className="user-icon" />
        </NavLink>
      </div>

      <button
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
};

export default Navbar;