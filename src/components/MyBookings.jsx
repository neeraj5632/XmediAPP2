import React, { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
  }, []);

  return (
    <div className="my-bookings">
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        bookings.map((b, i) => (
          <div key={i} className="booking-card">
            <h3>{b.name}</h3>
            <p>
              {b.address}, {b.city}, {b.state} {b.zip}
            </p>
            <p>Date: {b.date}</p>
            <p>Time: {b.time}</p>
          </div>
        ))
      )}
    </div>
  );
}
