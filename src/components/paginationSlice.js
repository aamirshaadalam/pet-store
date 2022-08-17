import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pageSize: 0,
  currentPage: 1,
  pageCount: 1,
  showFirst: false,
  showPrevious: false,
  showNext: true,
  showLast: true,
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPageSize: (state, { payload }) => {
      const { pageSize } = payload;
      state.pageSize = pageSize;
      state.currentPage = 1;
    },
    setCurrentPage: (state, { payload }) => {
      const { pageNumber } = payload;
      state.currentPage = pageNumber || 1;
    },
    updatePageChangeIcons: (state, { payload }) => {
      const { pageCount } = payload;

      state.pageCount = pageCount;

      if (state.currentPage > pageCount) {
        state.currentPage = pageCount;
      }

      if (state.currentPage === 1 && pageCount === 1) {
        state.showFirst = false;
        state.showPrevious = false;
        state.showNext = false;
        state.showLast = false;
      } else if (state.currentPage === pageCount) {
        state.showFirst = true;
        state.showPrevious = true;
        state.showNext = false;
        state.showLast = false;
      } else if (state.currentPage === 1) {
        state.showFirst = false;
        state.showPrevious = false;
        state.showNext = true;
        state.showLast = true;
      } else {
        state.showFirst = true;
        state.showPrevious = true;
        state.showNext = true;
        state.showLast = true;
      }
    },
  },
});

export const { setPageSize, setCurrentPage, updatePageChangeIcons } = paginationSlice.actions;

export const getPageSize = (state) => state.pagination.pageSize;
export const getPageCount = (state) => state.pagination.pageCount;
export const getCurrentPage = (state) => state.pagination.currentPage;
export const showFirst = (state) => state.pagination.showFirst;
export const showPrevious = (state) => state.pagination.showPrevious;
export const showNext = (state) => state.pagination.showNext;
export const showLast = (state) => state.pagination.showLast;

export default paginationSlice.reducer;
