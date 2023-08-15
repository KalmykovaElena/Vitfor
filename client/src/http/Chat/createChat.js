import { createAsyncThunk } from '@reduxjs/toolkit';
import { url } from '../../constants/url';
import { refreshToken } from '../refreshToken';

// eslint-disable-next-line consistent-return
export const createChat = createAsyncThunk('createChat', async (advertId, thunkAPI) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${url}/Message/CreateChat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ advertId }),
    });
    return await response.json();
  } catch (error) {
    if (error.status === 401) {
      refreshToken(createChat, advertId);
    } else thunkAPI.rejectWithValue('error');
  }
});
