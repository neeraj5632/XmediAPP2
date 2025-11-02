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

    // Save booking to localStorage (append if exists)
    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existing, booking]));

    alert("Appointment booked successfully!");

    onClose();
  };

  // For simplicity, show fixed time options & date input
  return (
    <div style={{ border: "1px solid black", padding: 10, marginTop: 20 }}>
      <h2>Book Appointment at {hospital["Hospital Name"]}</h2>

      <label>
        Select Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
        />
      </label>

      <div>
        <p>Select Time:</p>
        {["10:00 AM", "2:00 PM", "4:00 PM"].map((slot) => (
          <label key={slot} style={{ marginRight: 10 }}>
            <input
              type="radio"
              name="time"
              value={slot}
              checked={time === slot}
              onChange={(e) => setTime(e.target.value)}
            />
            {slot}
          </label>
        ))}
      </div>

      <button onClick={handleBooking}>Confirm Booking</button>
      <button onClick={onClose} style={{ marginLeft: 10 }}>
        Cancel
      </button>
    </div>
  );
};

export default BookingForm;
