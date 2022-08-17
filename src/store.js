import { configureStore } from '@reduxjs/toolkit';
import petReducer from './features/petStore/petSlice';
import modalReducer from './components/modalSlice';
import paginationReducer from './components/paginationSlice';

export const store = configureStore({
  reducer: {
    pets: petReducer,
    modal: modalReducer,
    pagination: paginationReducer,
  },
});
