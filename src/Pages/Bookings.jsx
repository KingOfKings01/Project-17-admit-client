import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../Store/bookingsSlice';

export default function Bookings() {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.items);
  const bookingStatus = useSelector((state) => state.bookings.status);

  useEffect(() => {
    if (bookingStatus === 'idle') {
      dispatch(fetchBookings());
    }
  }, [bookingStatus, dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Bookings</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Movie ID</th>
            <th className="py-2 px-4 border-b">Showtime ID</th>
            <th className="py-2 px-4 border-b">Is Valid</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="py-2 px-4 border-b">{booking.username}</td>
              <td className="py-2 px-4 border-b">{booking.email}</td>
              <td className="py-2 px-4 border-b">{booking.movieId}</td>
              <td className="py-2 px-4 border-b">{booking.showtimeId}</td>
              <td className="py-2 px-4 border-b">{booking.isValid ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
