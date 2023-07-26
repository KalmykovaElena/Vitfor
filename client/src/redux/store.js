import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import advertReducer from './reducers/advertReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    advert: advertReducer,
  },
});
export default store;
