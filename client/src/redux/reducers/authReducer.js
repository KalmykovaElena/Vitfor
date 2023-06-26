import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 'enter',
  currentError: {},
};

const authPageSlice = createSlice({
  name: 'authPage',
  initialState,
  reducers: {
    setAuthPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setAuthErrors: (state, action) => {
      state.currentError = action.payload;
    },
  },
});

export const { setAuthPage, setAuthErrors } = authPageSlice.actions;

export default authPageSlice.reducer;
