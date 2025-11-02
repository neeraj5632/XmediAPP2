// src/components/MyBookings.jsx
import { useState, useEffect } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(data);
  }, []);

  return (
    <div className="my-bookings">
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b, i) => (
          <div key={i}>
            <h3>{b.hospitalName}</h3>
            <p>
              {b.city}, {b.state}
            </p>
            <p>
              {b.date} - {b.time}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
