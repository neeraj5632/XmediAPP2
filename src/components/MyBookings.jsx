import React, { useEffect, useState } from "react";

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
        <p>No bookings yet</p>
      ) : (
        <ul>
          {bookings.map((b, i) => (
            <li key={i}>
              <h3>{b.name}</h3>
              <p>
                {b.address}, {b.city}, {b.state} {b.zip}
              </p>
              <p>Date: {b.date}</p>
              <p>Time: {b.time}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
