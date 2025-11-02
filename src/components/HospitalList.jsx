import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import BookingForm from "./BookingForm";

export default function HospitalList() {
  const [hospitals, setHospitals] = useState([]);
  const [selected, setSelected] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const state = query.get("state");
  const city = query.get("city");

  useEffect(() => {
    if (state && city) {
      axios
        .get(
          `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`
        )
        .then((res) => setHospitals(res.data))
        .catch(console.error);
    }
  }, [state, city]);

  if (!state || !city) return null;

  return (
    <div>
      <h1>
        {hospitals.length} medical centers available in {city.toLowerCase()}
      </h1>
      <ul>
        {hospitals.map((h, i) => (
          <li key={i}>
            <h3>{h["Hospital Name"]}</h3>
            <p>
              {h.City}, {h.State}
            </p>
            <button onClick={() => setSelected(h)}>
              Book FREE Center Visit
            </button>
          </li>
        ))}
      </ul>

      {selected && <BookingForm hospital={selected} />}
    </div>
  );
}
