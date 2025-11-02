// components/BookingForm.jsx
import { useState } from "react";

export default function BookingForm({ hospital }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBook = () => {
    const booking = {
      hospitalName: hospital["Hospital Name"],
      date,
      time,
      city: hospital.City,
      state: hospital.State,
    };

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    const updated = [...existing, booking];
    localStorage.setItem("bookings", JSON.stringify(updated));
    alert("Booking successful!");
  };

  return (
    <div>
      <p>Today</p>
      <p>Morning</p>
      <p>Afternoon</p>
      <p>Evening</p>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button onClick={handleBook}>Confirm Booking</button>
    </div>
  );
}
