import { createAsyncThunk } from '@reduxjs/toolkit';
import { url } from '../../constants/url';
import { refreshToken } from '../refreshToken';

// eslint-disable-next-line consistent-return
export const getChats = createAsyncThunk('getChats', async (_, thunkAPI) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${url}/Message/GetChats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    if (error.status === 401) {
      refreshToken(getChats);
    } else thunkAPI.rejectWithValue('error');
  }
});
