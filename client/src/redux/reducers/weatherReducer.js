import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  weatherData: {},
  nextWeatherData: [],
};

const weatherPageSlice = createSlice({
  name: 'weatherPage',
  initialState,
  reducers: {
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
    },
    setNextWeatherData: (state, action) => {
      state.nextWeatherData = action.payload;
    },
  },
});

export const { setWeatherData, setNextWeatherData } = weatherPageSlice.actions;

export default weatherPageSlice.reducer;
