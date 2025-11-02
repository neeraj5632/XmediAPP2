import React, { useEffect, useState } from "react";
import { getMedicalCenters } from "../api";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function HospitalList() {
  const [searchParams] = useSearchParams();
  const state = searchParams.get("state");
  const city = searchParams.get("city");
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      {centers.map((center, idx) => (
        <div key={idx} className="hospital-card">
          <h3>{center.name}</h3>
          <p>
            {center.address}, {center.city}, {center.state} {center.zip}
          </p>
          <p>Rating: {center.rating || "N/A"}</p>
          <button onClick={() => navigate("/book", { state: center })}>
            Book FREE Center Visit
          </button>
        </div>
      ))}
    </div>
  );
}
