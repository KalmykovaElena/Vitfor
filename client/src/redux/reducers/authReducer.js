import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  approval: false,
  profileData: {},
  user: {},
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
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setIsAuth, setProfileData, setApproval, setUser } = authPageSlice.actions;

export default authPageSlice.reducer;
