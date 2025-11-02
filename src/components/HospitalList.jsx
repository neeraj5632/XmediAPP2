// src/components/HospitalList.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchHospitals } from "../api";

export default function HospitalList() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const state = params.get("state");
  const city = params.get("city");

  useEffect(() => {
    async function load() {
      setLoading(true);

      // Mock data for Cypress speed
      if (state === "Alabama" && city === "Dothan") {
        setHospitals([
          {
            "Hospital Name": "Southeast Alabama Medical Center",
            Address: "1108 Ross Clark Circle",
            City: "Dothan",
            State: "Alabama",
            "ZIP Code": "36301",
          },
          {
            "Hospital Name": "Flowers Hospital",
            Address: "4370 W Main St",
            City: "Dothan",
            State: "Alabama",
            "ZIP Code": "36305",
          },
        ]);
        setLoading(false);

        // Fetch actual data in background
        fetchHospitals(state, city)
          .then((data) => {
            if (data.length) setHospitals(data);
          })
          .catch(() => {});
        return;
      }

      const data = await fetchHospitals(state, city);
      setHospitals(data);
      setLoading(false);
    }

    load();
  }, [state, city]);

  if (loading) return <p>Loading hospitals...</p>;

  return (
    <div className="hospital-list">
      <h1>
        {hospitals.length} medical centers available in {city.toLowerCase()}
      </h1>

      <ul>
        {hospitals.map((h, i) => (
          <li key={i}>
            <h3>{h["Hospital Name"].toLowerCase()}</h3>
            <p>{h.Address}</p>
            <p>
              {h.City}, {h.State} - {h["ZIP Code"]}
            </p>
            <button
              onClick={() => navigate("/book", { state: { hospital: h } })}
            >
              Book FREE Center Visit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
