import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import HospitalList from "./components/HospitalList";
import BookingForm from "./components/BookingForm";
import MyBookings from "./components/MyBookings";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/search" element={<HospitalList />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </Router>
  );
}

export default App;
