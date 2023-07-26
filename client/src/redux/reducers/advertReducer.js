import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  advert: {},
};

const advertPageSlice = createSlice({
  name: 'advertPage',
  initialState,
  reducers: {
    setAdvert: (state, action) => {
      state.advert = action.payload;
    },
  },
});

export const { setAdvert } = advertPageSlice.actions;

export default advertPageSlice.reducer;
