import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  forumTheme: null,
};

const forumThemeSlice = createSlice({
  name: 'getForumTheme',
  initialState,
  reducers: {
    setForumTheme: (state, action) => {
      state.forumTheme = action.payload;
    },
  },
});

export const { setForumTheme } = forumThemeSlice.actions;
export const forumReducer = forumThemeSlice.reducer;
