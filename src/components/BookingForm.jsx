import React, { useState } from "react";

const BookingForm = ({ hospital, onClose }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleBooking = () => {
    if (!date || !time) {
      alert("Please select both date and time.");
      return;
    }

    const booking = {
      "Hospital Name": hospital["Hospital Name"],
      City: hospital.City,
      State: hospital.State,
      "Hospital Type": hospital["Hospital Type"],
      "Hospital overall rating": hospital["Hospital overall rating"],
      bookingDate: date,
      bookingTime: time,
    };

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existing, booking]));

    alert("Appointment booked successfully!");
    onClose();
  };

  return (
    <div style={{ border: "1px solid black", padding: 10, marginTop: 20 }}>
      <h2>Book Appointment at {hospital["Hospital Name"]}</h2>

      {/* Add label "Today" */}
      <p>Today</p>

      <label>
        Select Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
        />
      </label>

      {/* Add labels for time segments */}
      <p>Morning</p>
      <label style={{ marginRight: 10 }}>
        <input
          type="radio"
          name="time"
          value="10:00 AM"
          checked={time === "10:00 AM"}
          onChange={(e) => setTime(e.target.value)}
        />
        10:00 AM
      </label>

      <p>Afternoon</p>
      <label style={{ marginRight: 10 }}>
        <input
          type="radio"
          name="time"
          value="2:00 PM"
          checked={time === "2:00 PM"}
          onChange={(e) => setTime(e.target.value)}
        />
        2:00 PM
      </label>

      <p>Evening</p>
      <label style={{ marginRight: 10 }}>
        <input
          type="radio"
          name="time"
          value="4:00 PM"
          checked={time === "4:00 PM"}
          onChange={(e) => setTime(e.target.value)}
        />
        4:00 PM
      </label>

      <br />
      <button onClick={handleBooking}>Confirm Booking</button>
      <button onClick={onClose} style={{ marginLeft: 10 }}>
        Cancel
      </button>
    </div>
  );
};

export default BookingForm;
