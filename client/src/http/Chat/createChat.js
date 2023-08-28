import { createAsyncThunk } from '@reduxjs/toolkit';
import { url } from '../../constants/url';
import { refreshToken } from '../refreshToken';

// eslint-disable-next-line consistent-return
export const createChat = createAsyncThunk('createChat', async (data, thunkAPI) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${url}/Message/CreateChat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'ngrok-skip-browser-warning': '1',
        Host: `${url}`,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    if (error.status === 401) {
      refreshToken(createChat, data);
    } else thunkAPI.rejectWithValue('error');
  }
});
