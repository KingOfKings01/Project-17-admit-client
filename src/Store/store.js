import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import movieReducer from './movieSlice';
import showtimeReducer from './showtimeSlice'
import bookingReducer from './bookingsSlice';

const store = configureStore({
  reducer: {
    movies: movieReducer,
    categories: categoryReducer,
    showtime: showtimeReducer,
    bookings: bookingReducer
  },
});

export default store;
