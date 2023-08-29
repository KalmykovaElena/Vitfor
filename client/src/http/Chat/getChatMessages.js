import { createAsyncThunk } from '@reduxjs/toolkit';
import { url } from '../../constants/url';
import { refreshToken } from '../refreshToken';

// eslint-disable-next-line consistent-return
export const getChatMessages = createAsyncThunk('getChatMessages', async (chatId, thunkAPI) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${url}/Message/GetChatMessages?${new URLSearchParams({ chatId })}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.json();
  } catch (error) {
    if (error.status === 401) {
      refreshToken(getChatMessages, chatId);
    } else thunkAPI.rejectWithValue('error');
  }
});
