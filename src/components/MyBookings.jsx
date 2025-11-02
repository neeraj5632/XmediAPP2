export default function MyBookings() {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.map((b, i) => (
        <div key={i}>
          <h3>{b.hospitalName}</h3>
          <p>
            {b.date} - {b.time}
          </p>
          <p>
            {b.city}, {b.state}
          </p>
        </div>
      ))}
    </div>
  );
}
