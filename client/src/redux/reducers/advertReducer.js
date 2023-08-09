import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  advert: {},
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
  },
});

export const { setAdvert, setSortParametr } = advertPageSlice.actions;

export default advertPageSlice.reducer;
