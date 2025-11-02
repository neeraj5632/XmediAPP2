// src/components/Search.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStates, fetchCities } from "../api";

export default function Search() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchStates().then(setStates);
  }, []);

  async function handleStateChange(e) {
    const state = e.target.value;
    setSelectedState(state);
    if (state) {
      const data = await fetchCities(state);
      setCities(data);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (selectedState && selectedCity) {
      navigate(`/results?state=${selectedState}&city=${selectedCity}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="search-section">
      <div id="state">
        <select value={selectedState} onChange={handleStateChange}>
          <option value="">Select State</option>
          {states.map((s, i) => (
            <option key={i}>{s}</option>
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
            <option key={i}>{c}</option>
          ))}
        </select>
      </div>

      <button id="searchBtn" type="submit">
        Search
      </button>
    </form>
  );
}
