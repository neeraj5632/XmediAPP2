// src/api.jsx
const BASE_URL = "https://meddata-backend.onrender.com";

export async function fetchStates() {
  const res = await fetch(`${BASE_URL}/states`);
  return await res.json();
}

export async function fetchCities(state) {
  const res = await fetch(`${BASE_URL}/cities/${state}`);
  return await res.json();
}

export async function fetchHospitals(state, city) {
  const res = await fetch(`${BASE_URL}/data?state=${state}&city=${city}`);
  return await res.json();
}
