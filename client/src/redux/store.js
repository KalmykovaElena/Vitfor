import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import weatherReduser from './reducers/weatherReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    weathher: weatherReduser,
  },
});
export default store;
