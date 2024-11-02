import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const path = import.meta.env.VITE_APP_API + '/showtime/';

// Thunks
export const fetchShowtimes = createAsyncThunk(
  'showtimes/fetchShowtimes',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
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

export const addShowtime = createAsyncThunk(
  'showtimes/addShowtime',
  async (showtimeData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        path,
        showtimeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateShowtime = createAsyncThunk(
  'showtimes/updateShowtime',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
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

export const deleteShowtime = createAsyncThunk(
  'showtimes/deleteShowtime',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
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

const showtimesSlice = createSlice({
  name: 'showtimes',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowtimes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShowtimes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchShowtimes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addShowtime.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateShowtime.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (showtime) => showtime.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteShowtime.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (showtime) => showtime.id !== action.payload
        );
      });
  },
});

export default showtimesSlice.reducer;
