import { createAsyncThunk } from '@reduxjs/toolkit';
import { url } from '../../constants/url';
import { refreshToken } from '../refreshToken';

// eslint-disable-next-line consistent-return
export const getFind = createAsyncThunk('getFind', async (findId, thunkAPI) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${url}/Finds/GetFindCard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ findId }),
    });
    return response.json();
  } catch (error) {
    if (error.status === 401) {
      refreshToken(getFind, findId);
    } else thunkAPI.rejectWithValue('error');
  }
});
