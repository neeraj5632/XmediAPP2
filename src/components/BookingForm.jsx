import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BookingForm() {
  const { state: hospital } = useLocation();
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const times = ["Morning", "Afternoon", "Evening"];

  const handleBooking = () => {
    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    const newBooking = { ...hospital, date, time };
    localStorage.setItem("bookings", JSON.stringify([...existing, newBooking]));
    navigate("/my-bookings");
  };

  return (
    <div className="booking-page">
      <h1>Book Appointment</h1>
      <h3>{hospital?.name}</h3>

      <p>Today</p>
      <input
        type="date"
        value={date}
        min={new Date().toISOString().split("T")[0]}
        max={
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0]
        }
        onChange={(e) => setDate(e.target.value)}
      />

      {times.map((t) => (
        <div key={t}>
          <p>{t}</p>
          <input
            type="radio"
            name="time"
            value={t}
            onChange={(e) => setTime(e.target.value)}
          />{" "}
          {t}
        </div>
      ))}

      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
}
