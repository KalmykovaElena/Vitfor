import { createSlice } from '@reduxjs/toolkit';
import { getChats } from '../../http/Chat/getChats';
import { createChat } from '../../http/Chat/createChat';
import { getChatMessages } from '../../http/Chat/getChatMessages';

const initialState = {
  chats: [],
  messages: [],
  actualChat: {},
  selectedUser: {},
  advert: {},
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    getMessages: (state, action) => {
      state.messages = action.payload;
    },
    getActualChat: (state, action) => {
      state.actualChat = action.payload;
    },
    getSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    getAdvert: (state, action) => {
      state.advert = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getChats.fulfilled, (state, action) => {
        state.chats = action.payload;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.actualChat = action.payload;
      })
      .addCase(getChatMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      });

    // [getChats.pending.type]: (state) => {
    //   state.isLoading = true;
    // },
    // [getChats.rejected.type]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    // [createChat.fulfilled.type]: (state, action) => {
    //   state.actualChat = action.payload;
    //   state.isLoading = false;
    //   state.error = '';
    // },
    // [createChat.pending.type]: (state) => {
    //   state.isLoading = true;
    // },
    // [createChat.rejected.type]: (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
});

export const chatAction = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
