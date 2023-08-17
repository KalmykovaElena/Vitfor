import { createSlice } from '@reduxjs/toolkit';
import { fetchLatestAdverts } from 'http/fetchLatestAdverts';

const initialState = {
  advert: {},
  adverts: [],
  sort: 'По умолчанию',
  status: null,
  error: null,
};

const advertsSlice = createSlice({
  name: 'adverts',
  initialState,
  reducers: {
    setAdvert: (state, action) => {
      state.advert = action.payload;
    },
    setSortParametr: (state, action) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestAdverts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchLatestAdverts.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.adverts = action.payload;
      })
      .addCase(fetchLatestAdverts.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export const { setAdvert, setSortParametr } = advertsSlice.actions;

export default advertsSlice.reducer;
