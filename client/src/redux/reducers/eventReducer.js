import { createSlice } from '@reduxjs/toolkit';
import { getEvent } from 'http/Events/getEvent';

const initialState = {
  event: {},
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvent: (state, action) => {
      state.event = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getEvent.fulfilled, (state, action) => {
      state.event = action.payload;
    });
  },
});

export const { setEvent } = eventsSlice.actions;
export const eventsReducer = eventsSlice.reducer;
