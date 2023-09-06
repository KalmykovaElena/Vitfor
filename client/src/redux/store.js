import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import advertReducer from './reducers/advertReducer';
import { chatReducer } from './reducers/chatReducer';
import searchReducer from './reducers/searchReducer';
import { serviceReducer } from './reducers/serviseReduser';
import { findsReducer } from './reducers/findsReducer';
import { forumReducer } from './reducers/forumReducer';
import { eventsReducer } from './reducers/eventReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    advert: advertReducer,
    chat: chatReducer,
    search: searchReducer,
    service: serviceReducer,
    find: findsReducer,
    forum: forumReducer,
    event: eventsReducer,
  },
});
export default store;
