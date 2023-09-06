import { createAsyncThunk } from '@reduxjs/toolkit';
import { url } from '../../constants/url';
import { refreshToken } from '../refreshToken';

// eslint-disable-next-line consistent-return
export const getEvent = createAsyncThunk('getEvent', async (eventId, thunkAPI) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${url}/Events/GetEventCard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ eventId }),
    });
    return response.json();
  } catch (error) {
    if (error.status === 401) {
      refreshToken(getEvent, eventId);
    } else thunkAPI.rejectWithValue('error');
  }
});
