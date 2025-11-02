import React, { useEffect, useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(saved);
  }, []);

  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.length === 0 && <p>No bookings found.</p>}
      <ul>
        {bookings.map((booking, idx) => (
          <li key={idx}>
            <h3>{booking["Hospital Name"]}</h3>
            <p>Date: {booking.bookingDate}</p>
            <p>Time: {booking.bookingTime}</p>
            <p>City: {booking.City}</p>
            <p>State: {booking.State}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookings;
