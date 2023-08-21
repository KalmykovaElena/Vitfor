import { url } from 'constants/url';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { refreshToken } from './refreshToken';

const token = localStorage.getItem('token') || '';
export const fetchLatestAdverts = createAsyncThunk('adverts/fetchAdverts', async (category, { rejectWithValue }) => {
  const path = category === 'sale' ? 'Adverts/GetFourNewestAdverts' : 'Jobs/GetFourNewestJobs';
  try {
    const response = await fetch(`${url}/${path}`, {
      headers: {
        Accept: 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
        'ngrok-skip-browser-warning': '1',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        refreshToken(fetchLatestAdverts);
      }
      throw new Error('Server Error!');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
