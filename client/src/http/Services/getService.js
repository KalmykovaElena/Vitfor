import { createAsyncThunk } from '@reduxjs/toolkit';
import { url } from '../../constants/url';
import { refreshToken } from '../refreshToken';

// eslint-disable-next-line consistent-return
export const getService = createAsyncThunk('getService', async (jobId, thunkAPI) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${url}/Jobs/GetJobCard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ jobId }),
    });
    return response.json();
  } catch (error) {
    if (error.status === 401) {
      refreshToken(getService, jobId);
    } else thunkAPI.rejectWithValue('error');
  }
});
