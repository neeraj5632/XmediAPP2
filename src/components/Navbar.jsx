// src/components/Navbar.jsx
import { Link } from "react-router-dom";
//import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Find Doctors</Link> | <Link to="/">Hospitals</Link> |{" "}
      <Link to="/">Medicines</Link> | <Link to="/my-bookings">My Bookings</Link>
    </nav>
  );
}
