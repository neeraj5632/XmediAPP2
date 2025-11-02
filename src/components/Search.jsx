import React, { useEffect, useState } from "react";
import { getStates, getCities } from "../api";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getStates().then(setStates);
  }, []);

  useEffect(() => {
    if (selectedState) {
      getCities(selectedState).then(setCities);
    }
  }, [selectedState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?state=${selectedState}&city=${selectedCity}`);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div id="state">
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          required
        >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div id="city">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          required
        >
          <option value="">Select City</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" id="searchBtn">
        Search
      </button>
    </form>
  );
}
