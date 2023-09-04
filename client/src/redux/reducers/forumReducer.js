import { createSlice } from '@reduxjs/toolkit';
import { getForumTheme } from 'http/Forum/getForumTheme';

const initialState = {
  forumTheme: {},
};

const forumThemeSlice = createSlice({
  name: 'getForumTheme',
  initialState,
  reducers: {
    setForumTheme: (state, action) => {
      state.forumTheme = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getForumTheme.fulfilled, (state, action) => {
      state.forumTheme = action.payload;
    });
  },
});

export const { setForumTheme } = forumThemeSlice.actions;
export const forumReducer = forumThemeSlice.reducer;
