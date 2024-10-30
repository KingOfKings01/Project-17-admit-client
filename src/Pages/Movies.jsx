import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, } from '../Store/movieSlice';
import MovieForm from '../Components/Movie/MovieForm';
import MovieList from '../Components/Movie/MovieList';

export default function Movies() {
  const dispatch = useDispatch();
  
  const movieStatus = useSelector((state) => state.movies.status);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (movieStatus === 'idle') {
      dispatch(fetchMovies());
    }
  }, [movieStatus, dispatch]);

  
  const handleEdit = (movie) => {
    setSelectedMovie(movie);
    setIsFormOpen(true);
  };
  
  const handleCloseForm = () => {
    setSelectedMovie(null);
    setIsFormOpen(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Movie Management</h1>
      <button onClick={() => setIsFormOpen(true)} className="bg-green-500 text-white p-2 rounded">
        Add Movie
      </button>

      {isFormOpen && <MovieForm selectedMovie={selectedMovie} onClose={handleCloseForm} />}

      {
        movieStatus === 'loading' && <p>Loading...</p>
      }

      <MovieList handleEdit={handleEdit} />
    </div>
  );
}
