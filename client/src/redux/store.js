import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import advertReducer from './reducers/advertReducer';
import { chatReducer } from './reducers/chatReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    advert: advertReducer,
    chat: chatReducer,
  },
});
export default store;
