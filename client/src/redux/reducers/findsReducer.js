import { getFind } from 'http/Finds/getFind';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  find: {},
};

const findsSlice = createSlice({
  name: 'finds',
  initialState,
  reducers: {
    setFind: (state, action) => {
      state.find = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getFind.fulfilled, (state, action) => {
      state.find = action.payload;
    });
  },
});

export const { setFind } = findsSlice.actions;
export const findsReducer = findsSlice.reducer;
