import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchItems: {},
};

const searchSlice = createSlice({
  name: 'searchItems',
  initialState,
  reducers: {
    setSearchItems: (state, action) => {
      state.searchItems = action.payload;
    },
  },
});

export const { setSearchItems } = searchSlice.actions;

export default searchSlice.reducer;
