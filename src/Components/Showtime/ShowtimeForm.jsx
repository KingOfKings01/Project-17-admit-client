import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addShowtime } from '../../Store/showtimeSlice';

export default function ShowtimeForm() {
  const [movieId, setMovieId] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addShowtime({ movieId, time, date }));
    setMovieId('');
    setTime('');
    setDate('');
  };

  return (
    <form className="bg-white p-4 rounded-lg shadow-md mb-6" onSubmit={handleSubmit}>
      <h3 className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Add New Showtime</h3>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="movieId">Movie ID</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="movieId"
          type="text"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">Time</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="time"
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Date</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Showtime
      </button>
    </form>
  );
}
