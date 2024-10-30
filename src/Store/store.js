import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import movieReducer from './movieSlice';
import showtimeReducer from './showtimeSlice'

const store = configureStore({
  reducer: {
    movies: movieReducer,
    categories: categoryReducer,
    showtime: showtimeReducer
  },
});

export default store;
