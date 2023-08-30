import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import advertReducer from './reducers/advertReducer';
import { chatReducer } from './reducers/chatReducer';
import searchReducer from './reducers/searchReducer';
import { serviceReducer } from './reducers/serviseReduser';
import { findsReducer } from './reducers/findsReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    advert: advertReducer,
    chat: chatReducer,
    search: searchReducer,
    service: serviceReducer,
    find: findsReducer,
  },
});
export default store;
