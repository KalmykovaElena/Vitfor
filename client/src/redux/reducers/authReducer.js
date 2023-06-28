import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authError: {},
};

const authPageSlice = createSlice({
  name: 'authPage',
  initialState,
  reducers: {
    setAuthErrors: (state, action) => {
      state.authError = action.payload;
    },
  },
});

export const { setAuthErrors } = authPageSlice.actions;

export default authPageSlice.reducer;
