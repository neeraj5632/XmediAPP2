import React, { useEffect, useState } from "react";
import { getMedicalCenters } from "../api";

export default function HospitalList() {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCenter, setSelectedCenter] = useState(null);

  const query = new URLSearchParams(window.location.search);
  const state = query.get("state");
  const city = query.get("city");

  useEffect(() => {
    if (state && city) {
      getMedicalCenters(state, city)
        .then((data) => {
          const filtered = data.map((h) => ({
            name: h["Hospital Name"],
            address: h["Address"],
            city: h["City"],
            state: h["State"],
            zip: h["ZIP Code"],
            rating: h["Hospital overall rating"],
          }));
          setCenters(filtered);
        })
        .finally(() => setLoading(false));
    }
  }, [state, city]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="results-page">
      <h1>
        {centers.length} medical centers available in {city.toLowerCase()}
      </h1>
      <ul>
        {centers.map((center, idx) => (
          <li key={idx}>
            <h3>{center.name}</h3>
            <p>
              {center.address}, {center.city}, {center.state} {center.zip}
            </p>
            <p>Rating: {center.rating || "N/A"}</p>
            <button onClick={() => setSelectedCenter(center)}>
              Book FREE Center Visit
            </button>
          </li>
        ))}
      </ul>

      {selectedCenter && <BookingSection center={selectedCenter} />}
    </div>
  );
}

function BookingSection({ center }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const times = ["Morning", "Afternoon", "Evening"];

  const handleBooking = () => {
    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    const newBooking = { ...center, date, time };
    localStorage.setItem("bookings", JSON.stringify([...existing, newBooking]));
    alert("Booking confirmed!");
  };

  return (
    <div className="booking-section">
      <h1>Book Appointment</h1>
      <h3>{center.name}</h3>
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
