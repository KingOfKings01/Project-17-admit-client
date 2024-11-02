import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const path = import.meta.env.VITE_APP_API + "/movies/";

// Thunks
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(path, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (movieData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        path,
        movieData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const updateMovie = createAsyncThunk(
  "movies/updateMovie",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        path + id,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(path + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (movie) => movie.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (movie) => movie.id !== action.payload
        );
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.status = "failed";
        state.message = "There must be showtime set for this movie!"
        state.error = action.payload;
      });
  },
});

export default moviesSlice.reducer;