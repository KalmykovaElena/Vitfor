import { createSlice } from '@reduxjs/toolkit';
import { getEvent } from 'http/Events/getEvent';

const initialState = {
  event: {},
  events: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvent: (state, action) => {
      state.event = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getEvent.fulfilled, (state, action) => {
      state.event = action.payload;
    });
  },
});

export const { setEvent, setEvents } = eventsSlice.actions;
export const eventsReducer = eventsSlice.reducer;
