import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import HospitalList from "./components/HospitalList";
import MyBookings from "./components/MyBookings";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/results" element={<HospitalList />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </Router>
  );
}
