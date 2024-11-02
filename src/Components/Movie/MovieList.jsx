/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMovie } from '../../Store/movieSlice';

export default function MovieList({ handleEdit }) {
  const movies = useSelector((state) => state.movies.items);
  const message = useSelector((state) => state.movies.message);
  const dispatch = useDispatch();
  const [visibleMessage, setVisibleMessage] = useState('');

  useEffect(() => {
    if (message) {
      setVisibleMessage(message);
      const timer = setTimeout(() => {
        setVisibleMessage('');
      }, 5000); // Change the duration as needed
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  return (
    <>
      {visibleMessage && <h2 className="bg-red-500 w-full text-white py-3 px-4 my-2">{visibleMessage}</h2>}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-200 mb-10">
          <thead>
            <tr>
              <th className="row-data">Hero Image</th>
              <th className="row-data">Poster</th>
              <th className="row-data">Name</th>
              <th className="row-data">Description</th>
              <th className="row-data">Director</th>
              <th className="row-data">Genre</th>
              <th className="row-data">Release Date</th>
              <th className="row-data">Language</th>
              <th className="row-data">IMDb Rating</th>
              <th className="row-data">Trailer</th>
              <th className="row-data">Category</th>
              <th className="row-data">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.length === 0 && (
              <tr>
                <td colSpan={12} className="py-2 px-4 text-center">
                  No movies found.
                </td>
              </tr>
            )}
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td className="row-data">
                  <img src={movie.heroSectionImage} alt={`${movie.name} Hero`} className="h-12 w-auto" />
                </td>
                <td className="row-data">
                  <img src={movie.poster} alt={`${movie.name} Poster`} className="h-12 w-auto" />
                </td>
                <td className="row-data">{movie.name}</td>
                <td className="py-2 px-4 border-b ">
                  <p className="w-[300px] h-[7rem] text-justify overflow-y-auto px-4">
                    {movie.description}
                  </p>
                </td>
                <td className="row-data">{movie.director}</td>
                <td className="row-data">{movie.genre}</td>
                <td className="row-data">{new Date(movie.releaseDate).toLocaleDateString()}</td>
                <td className="row-data">{movie.language}</td>
                <td className="row-data">{movie.imdbRating}</td>
                <td className="row-data">
                  <a href={movie.trailerLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    Watch Trailer
                  </a>
                </td>
                <td className="row-data">{movie.category?.name || 'Uncategorized'}</td>
                <td className="row-data">
                  <button
                    onClick={() => handleEdit(movie)}
                    className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(movie.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
