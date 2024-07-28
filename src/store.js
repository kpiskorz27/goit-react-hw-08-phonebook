import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './slices/contactSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    auth: authReducer,
  },
});

export default store;
