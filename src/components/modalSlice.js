import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  selectedRow: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state) => {
      state.isOpen = true;
    },
    hideModal: (state) => {
      state.isOpen = false;
      state.selectedRow = null;
    },
    setSelectedRow: (state, { payload }) => {
      state.selectedRow = payload;
    },
  },
});

export const { showModal, hideModal, setSelectedRow } = modalSlice.actions;

export const getStatus = (state) => state.modal.isOpen;
export const getSelectedRow = (state) => state.modal.selectedRow;

export default modalSlice.reducer;
