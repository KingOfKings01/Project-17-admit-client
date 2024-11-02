import  { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addShowtime } from '../../Store/showtimeSlice';
import { fetchMovies } from '../../Store/movieSlice'; // Ensure this import is correct

export default function ShowtimeForm() {
  const [movieId, setMovieId] = useState('');
  const [dateTime, setDateTime] = useState('');
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.items);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addShowtime({ movieId, dateTime }));
    setMovieId('');
    setDateTime('');
  };

  return (
    <form className="bg-white p-4 rounded-lg shadow-md mb-6" onSubmit={handleSubmit}>
      <h3 className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Add New Showtime</h3>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="movieId">Movie</label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="movieId"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
          required
        >
          <option value="">Select a movie</option>
          {movies.map(movie => (
            <option key={movie.id} value={movie.id}>{movie.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateTime">Date & Time</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="dateTime"
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
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
