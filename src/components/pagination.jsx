import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getPageSize,
  getCurrentPage,
  setPageSize,
  setCurrentPage,
  showFirst,
  showPrevious,
  showNext,
  showLast,
  updatePageChangeIcons,
} from './paginationSlice';
import '../styles/pagination.scss';

export default function Pagination({ pageSizeOptions, defaultPageSize, totalRecords }) {
  const dispatch = useDispatch();
  const pageSize = useSelector(getPageSize);
  const currentPage = useSelector(getCurrentPage);
  const enableFirst = useSelector(showFirst);
  const enablePrevious = useSelector(showPrevious);
  const enableNext = useSelector(showNext);
  const enableLast = useSelector(showLast);

  const getPageCount = useCallback(
    (pageSize) => {
      if (totalRecords && totalRecords % pageSize === 0) return totalRecords / pageSize;
      else return Math.floor(totalRecords / pageSize) + 1;
    },
    [totalRecords]
  );

  useEffect(() => {
    if (pageSize === 0) {
      if (
        defaultPageSize &&
        pageSizeOptions &&
        pageSizeOptions.length > 0 &&
        pageSizeOptions.indexOf(defaultPageSize) !== -1
      ) {
        dispatch(
          setPageSize({
            pageSize: defaultPageSize,
            pageCount: getPageCount(defaultPageSize),
          })
        );
      }
    }
  }, []);

  useEffect(() => {
    dispatch(updatePageChangeIcons({ pageCount: getPageCount(pageSize) }));
  }, [dispatch, pageSize, getPageCount]);

  function changePageSize(pageSize) {
    if (pageSize) {
      const pageCount = getPageCount(pageSize);
      dispatch(setPageSize({ pageSize, pageCount }));
    }
  }

  function changeCurrentPage(pageNumber) {
    const pageCount = getPageCount(pageSize);
    if (pageNumber <= pageCount && pageNumber > 0) dispatch(setCurrentPage({ pageNumber, pageCount }));
  }

  return (
    <div className='pagination'>
      <div>
        <label htmlFor='page-size'>Page Size: </label>
        <select id='page-size' value={pageSize} onChange={(e) => changePageSize(e.target.value)}>
          {pageSizeOptions.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className='page-nav'>
        <span onClick={() => changeCurrentPage(1)} className={!enableFirst ? 'disable-item' : ''}>
          &laquo;
        </span>
        <span onClick={() => changeCurrentPage(currentPage - 1)} className={!enablePrevious ? 'disable-item' : ''}>
          &lsaquo;
        </span>
        <span className='active'>{currentPage}</span>
        <span onClick={() => changeCurrentPage(currentPage + 1)} className={!enableNext ? 'disable-item' : ''}>
          &rsaquo;
        </span>
        <span onClick={() => changeCurrentPage(getPageCount(pageSize))} className={!enableLast ? 'disable-item' : ''}>
          &raquo;
        </span>
      </div>
    </div>
  );
}
