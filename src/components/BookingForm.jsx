// src/components/BookingForm.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BookingForm() {
  const { state } = useLocation();
  const hospital = state?.hospital;
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  const minDate = today.toISOString().split("T")[0];
  const maxDate = nextWeek.toISOString().split("T")[0];

  function confirmBooking() {
    if (!date || !time) return;
    const newBooking = {
      hospitalName: hospital["Hospital Name"].toLowerCase(),
      date,
      time,
      state: hospital.State,
      city: hospital.City,
    };

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    const updated = [...existing, newBooking];
    localStorage.setItem("bookings", JSON.stringify(updated));
    navigate("/my-bookings");
  }

  if (!hospital) return <p>No hospital selected.</p>;

  return (
    <div className="booking-form">
      <h3>{hospital["Hospital Name"].toLowerCase()}</h3>
      <p>Book your appointment</p>
      <p>Today</p>
      <p>Morning</p>
      <p>Afternoon</p>
      <p>Evening</p>

      <label>Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        min={minDate}
        max={maxDate}
      />

      <label>Time:</label>
      <select value={time} onChange={(e) => setTime(e.target.value)}>
        <option value="">Select Time</option>
        <option>09:00 AM</option>
        <option>12:00 PM</option>
        <option>03:00 PM</option>
        <option>06:00 PM</option>
      </select>

      <button onClick={confirmBooking}>Confirm Booking</button>
    </div>
  );
}
