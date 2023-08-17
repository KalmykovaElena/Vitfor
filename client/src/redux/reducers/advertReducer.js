import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  advert: {},
  editAdvert: {},
  sort: 'По умолчанию',
};

const advertPageSlice = createSlice({
  name: 'advertPage',
  initialState,
  reducers: {
    setAdvert: (state, action) => {
      state.advert = action.payload;
    },
    setSortParametr: (state, action) => {
      state.sort = action.payload;
    },
    setEditAdvert: (state, action) => {
      state.editAdvert = action.payload;
    },
  },
});

export const { setAdvert, setSortParametr, setEditAdvert } = advertPageSlice.actions;

export default advertPageSlice.reducer;
