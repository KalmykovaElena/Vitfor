import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import advertReducer from './reducers/advertReducer';
import { chatReducer } from './reducers/chatReducer';
import searchReducer from './reducers/searchReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    advert: advertReducer,
    chat: chatReducer,
    search: searchReducer,
  },
});
export default store;
