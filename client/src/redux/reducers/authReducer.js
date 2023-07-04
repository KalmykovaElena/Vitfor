import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  approval: false,
  authError: {},
  profileData: {},
};

const authPageSlice = createSlice({
  name: 'authPage',
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setApproval: (state, action) => {
      state.approval = action.payload;
    },
    setAuthErrors: (state, action) => {
      state.authError = action.payload;
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
  },
});

export const { setIsAuth, setAuthErrors, setProfileData, setApproval } = authPageSlice.actions;

export default authPageSlice.reducer;
