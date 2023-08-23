import { createSlice } from '@reduxjs/toolkit';
import { fetchLatestAdverts } from 'http/fetchLatestAdverts';

const initialState = {
  advert: {},
  editAdvert: {},
  adverts: null,
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
    setAdverts: (state, action) => {
      state.adverts = action.payload;
    },
    setStatus: (state, action) => {
      state.adverts = action.payload;
    },
    setSortParametr: (state, action) => {
      state.sort = action.payload;
    },
    setEditAdvert: (state, action) => {
      state.editAdvert = action.payload;
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

export const { setAdvert, setAdverts, setStatus, setSortParametr, setEditAdvert } = advertsSlice.actions;

export default advertsSlice.reducer;
