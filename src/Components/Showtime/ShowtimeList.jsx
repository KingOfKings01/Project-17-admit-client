import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShowtimes, deleteShowtime } from '../../Store/showtimeSlice';

export default function ShowtimeList() {
  const dispatch = useDispatch();
  const showtimes = useSelector((state) => state.showtime.items);
  const showtimeStatus = useSelector((state) => state.showtime.status);

  useEffect(() => {
    if (showtimeStatus === 'idle') {
      dispatch(fetchShowtimes());
    }
  }, [showtimeStatus, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteShowtime(id));
  };

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Movie Name</th>
          <th className="py-2 px-4 border-b">Time</th>
          <th className="py-2 px-4 border-b">Date</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          showtimeStatus === 'loading' && (
            <tr>
              <td colSpan="4" className="py-2 px-4 border-b text-center">
                Loading...
              </td>
            </tr>
          )
        }

        {
          showtimeStatus === 'succeeded' && showtimes.length === 0 && (
            <tr>
              <td colSpan="4" className="py-2 px-4 border-b text-center">
                No showtimes found.
              </td>
            </tr>
          )
        }

        {showtimes.map((showtime) => (
          <tr key={showtime.id}>
            {console.log(showtime)}
            <td className="py-2 px-4 border-b">{showtime.movie?.name}</td>
            <td className="py-2 px-4 border-b">{new Date(showtime.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
            <td className="py-2 px-4 border-b">{new Date(showtime.dateTime).toLocaleDateString()}</td>
            <td className="py-2 px-4 border-b">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                onClick={() => handleDelete(showtime.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
