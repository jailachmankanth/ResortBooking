import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const Id = localStorage.getItem("user_id")
  return (
    <nav className="navbar">
      <h1>Aura Resorts</h1>

      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          <NavLink to="/resorts">Resorts</NavLink>
        </li>

        <li>
          <NavLink to="/activities">Activities</NavLink>
        </li>

        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>

      <div className="nav-icons">
        <NavLink
          to={'/cart'}
          className={({ isActive }) =>
            isActive ? "cart-icon active" : "cart-icon"
          }
        >
          <FaShoppingCart />
        </NavLink>
        <NavLink to={`/profile/${Id}`}><FaUserCircle className="user-icon" /></NavLink>
      </div>
    </nav>
  );
};

export default Navbar;