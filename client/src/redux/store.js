import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducers/reducer';
// import lessonsReducer from './reducers/reducer';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    // lessons: lessonsReducer,
    // и все остальные редьюсеры
  },
});
export default store;
