import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import advertReducer from './reducers/advertReducer';
import searchReducer from './reducers/searchReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    advert: advertReducer,
    search: searchReducer,
  },
});
export default store;
