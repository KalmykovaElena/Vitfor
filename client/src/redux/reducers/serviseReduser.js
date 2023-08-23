import { getService } from '../../http/Services/getService';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  service: {},
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setService: (state, action) => {
      state.service = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getService.fulfilled, (state, action) => {
      state.service = action.payload;
    });
  },
});

export const { setService } = serviceSlice.actions;
export const serviceReducer = serviceSlice.reducer;
