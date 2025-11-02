import React, { useEffect, useState } from "react";
import BookingForm from "./BookingForm";

const Search = () => {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [bookingHospital, setBookingHospital] = useState(null);

  // State and city lists (could also fetch dynamically if needed)
  const states = ["Alabama", "California", "Texas"]; // example states
  const cities = {
    Alabama: ["DOTHAN", "MONTGOMERY"],
    California: ["LOS ANGELES", "SAN FRANCISCO"],
    Texas: ["HOUSTON", "DALLAS"],
  };

  const fetchHospitals = () => {
    if (!state || !city) return;

    fetch(
      `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`
    )
      .then((res) => res.json())
      .then((data) => {
        setHospitals(data);
      })
      .catch(() => setHospitals([]));
  };

  return (
    <div>
      <div id="state">
        <button type="button">Select State</button>
        <ul>
          {states.map((st) => (
            <li
              key={st}
              onClick={() => setState(st)}
              style={{ cursor: "pointer" }}
            >
              {st}
            </li>
          ))}
        </ul>
      </div>

      <div id="city">
        <button type="button">Select City</button>
        <ul>
          {(cities[state] || []).map((ct) => (
            <li
              key={ct}
              onClick={() => setCity(ct)}
              style={{ cursor: "pointer" }}
            >
              {ct}
            </li>
          ))}
        </ul>
      </div>

      <button id="searchBtn" onClick={fetchHospitals}>
        Search
      </button>

      {hospitals.length > 0 && (
        <h1>
          {hospitals.length} medical centers available in {city.toLowerCase()}
        </h1>
      )}

      <ul>
        {hospitals.map((hospital, idx) => (
          <li key={idx}>
            <h3>{hospital["Hospital Name"]}</h3>
            <button onClick={() => setBookingHospital(hospital)}>
              Book FREE Center Visit
            </button>
          </li>
        ))}
      </ul>

      {bookingHospital && (
        <BookingForm
          hospital={bookingHospital}
          onClose={() => setBookingHospital(null)}
        />
      )}
    </div>
  );
};

export default Search;
