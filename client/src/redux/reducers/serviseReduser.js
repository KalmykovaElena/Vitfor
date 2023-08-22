import { getService } from '../../http/Services/getService';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  service: {},
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getService.fulfilled, (state, action) => {
      state.service = action.payload;
    });
  },
});

export const serviceAction = serviceSlice.actions;
export const serviceReducer = serviceSlice.reducer;
