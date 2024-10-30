import { useDispatch, useSelector } from "react-redux";
import { deleteMovie } from "../../Store/movieSlice";

/* eslint-disable react/prop-types */
export default function MovieList({handleEdit}) {
  const movies = useSelector((state) => state.movies.items);
  const dispatch = useDispatch();
  
  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Hero Image</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Poster</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Director</th>
            <th className="py-2 px-4 border-b">Genre</th>
            <th className="py-2 px-4 border-b">Release Date</th>
            <th className="py-2 px-4 border-b">Language</th>
            <th className="py-2 px-4 border-b">IMDb Rating</th>
            <th className="py-2 px-4 border-b">Trailer</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            movies.length === 0 && (
              <tr>
                <td colSpan={12} className="py-2 px-4 text-center">
                  No movies found.
                </td>
              </tr>
            )
          }
          { movies.map((movie) => (
            <tr key={movie.id}>
              <td className="py-2 px-4 border-b">
                <img src={movie.heroSectionImage} alt={`${movie.name} Hero`} className="h-12 w-auto" />
              </td>
              <td className="py-2 px-4 border-b">{movie.name}</td>
              <td className="py-2 px-4 border-b">{movie.poster}</td>
              <td className="py-2 px-4 border-b">{movie.description}</td>
              <td className="py-2 px-4 border-b">{movie.director}</td>
              <td className="py-2 px-4 border-b">{movie.genre}</td>
              <td className="py-2 px-4 border-b">{new Date(movie.releaseDate).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{movie.language}</td>
              <td className="py-2 px-4 border-b">{movie.imdbRating}</td>
              <td className="py-2 px-4 border-b">
                <a href={movie.trailerLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  Watch Trailer
                </a>
              </td>
              <td className="py-2 px-4 border-b">{movie.category?.name || 'Uncategorized'}</td>
              <td className="py-2 px-4 border-b">
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
  );
}
