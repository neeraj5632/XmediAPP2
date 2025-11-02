import React from "react";
import { Link } from "react-router-dom";
//import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/my-bookings">My Bookings</Link>
    </nav>
  );
}
