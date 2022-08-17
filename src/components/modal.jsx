import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStatus, hideModal } from './modalSlice';
import '../styles/modal.scss';

export default function Modal({ children }) {
  const modal = useRef(null);
  const isOpen = useSelector(getStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (modal && modal.current) {
      if (isOpen) modal.current.style.display = 'block';
      else modal.current.style.display = 'none';
    }
  }, [isOpen]);

  function onCloseClick() {
    dispatch(hideModal());
  }

  return (
    <div ref={modal} className='modal'>
      <div className='modal-content'>
        <span className='close' onClick={onCloseClick}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
}
