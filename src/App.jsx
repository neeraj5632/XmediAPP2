// App.js
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

const API_BASE = "https://meddata-backend.onrender.com";

// Landing Page
function LandingPage() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/states`)
      .then((res) => res.json())
      .then(setStates)
      .catch(console.error);
  }, []);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    if (state) {
      fetch(`${API_BASE}/cities/${state}`)
        .then((res) => res.json())
        .then(setCities)
        .catch(console.error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedState && selectedCity) {
      navigate(`/results?state=${selectedState}&city=${selectedCity}`);
    }
  };

  return (
    <div className="landing">
      <nav>
        <Link to="/">Find Doctors</Link>
        <Link to="/">Hospitals</Link>
        <Link to="/">Medicines</Link>
        <Link to="/my-bookings">My Bookings</Link>
      </nav>

      <form onSubmit={handleSubmit}>
        <div id="state">
          <select value={selectedState} onChange={handleStateChange}>
            <option value="">Select State</option>
            {states.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div id="city">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">Select City</option>
            {cities.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button id="searchBtn" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

// Search Results
function ResultsPage() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const state = query.get("state");
  const city = query.get("city");

  useEffect(() => {
    async function fetchHospitals() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/data?state=${state}&city=${city}`);
        const data = await res.json();
        setHospitals(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchHospitals();
  }, [state, city]);

  if (loading) return <p>Loading hospitals...</p>;

  return (
    <div>
      <h1>
        {hospitals.length} medical centers available in {city.toLowerCase()}
      </h1>
      <ul>
        {hospitals.map((hosp, i) => (
          <li key={i}>
            <h3>{hosp["Hospital Name"]}</h3>
            <p>{hosp.Address}</p>
            <p>
              {hosp.City}, {hosp.State} - {hosp["ZIP Code"]}
            </p>
            <button
              onClick={() => navigate("/book", { state: { hospital: hosp } })}
            >
              Book FREE Center Visit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Booking Page
function BookingPage() {
  const { state } = useLocation();
  const hospital = state?.hospital;
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [bookings, setBookings] = useState(
    JSON.parse(localStorage.getItem("bookings")) || []
  );

  if (!hospital) return <p>No hospital selected.</p>;

  const handleBook = () => {
    const newBooking = {
      hospitalName: hospital["Hospital Name"],
      date,
      time,
      state: hospital.State,
      city: hospital.City,
    };
    const updated = [...bookings, newBooking];
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
    navigate("/my-bookings");
  };

  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const minDate = today.toISOString().split("T")[0];
  const maxDate = nextWeek.toISOString().split("T")[0];

  return (
    <div>
      <h3>{hospital["Hospital Name"]}</h3>
      <p>Book your appointment</p>
      <p>Today</p>
      <p>Morning</p>
      <p>Afternoon</p>
      <p>Evening</p>
      <label>Date:</label>
      <input
        type="date"
        value={date}
        min={minDate}
        max={maxDate}
        onChange={(e) => setDate(e.target.value)}
      />
      <label>Time:</label>
      <select value={time} onChange={(e) => setTime(e.target.value)}>
        <option value="">Select Time</option>
        <option>09:00 AM</option>
        <option>12:00 PM</option>
        <option>03:00 PM</option>
        <option>06:00 PM</option>
      </select>
      <button onClick={handleBook}>Confirm Booking</button>
    </div>
  );
}

// My Bookings Page
function MyBookings() {
  const [bookings, setBookings] = useState(
    JSON.parse(localStorage.getItem("bookings")) || []
  );

  return (
    <div>
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

// App Routing
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </Router>
  );
}
