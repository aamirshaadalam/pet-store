import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createPet, updatePet } from './petSlice';
import { getSelectedRow, hideModal, getStatus } from '../../components/modalSlice';
import '../../styles/addPet.scss';

export default function AddPet() {
  const errorBorder = '1px solid #dc3545';
  const defaultBorder = '1px solid #ddd';
  const dispatch = useDispatch();
  const selectedRow = useSelector(getSelectedRow);
  const isModalOpen = useSelector(getStatus);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [url, setUrl] = useState('');
  const nameInput = useRef(null);
  const categoryInput = useRef(null);
  const quantityInput = useRef(null);
  const urlInput = useRef(null);
  const errorDiv = useRef(null);

  useEffect(() => {
    if (selectedRow) {
      const { name, category, quantity, url } = selectedRow;

      if (name && category && quantity && url) {
        setName(name);
        setCategory(category);
        setQuantity(quantity);
        setUrl(url);
      }
    } else if (isModalOpen) {
      clearInputs();
    }
  }, [selectedRow, isModalOpen]);

  const highlightErrors = useCallback((errors) => {
    if (!(errors && errors.length > 0)) {
      setDefaults();
    } else {
      if (errorDiv) errorDiv.current.style.display = 'block';

      if (errors.indexOf('name') === -1) {
        if (nameInput) nameInput.current.style.borderBottom = defaultBorder;
      } else {
        if (nameInput) nameInput.current.style.borderBottom = errorBorder;
      }

      if (errors.indexOf('category') === -1) {
        if (categoryInput) categoryInput.current.style.borderBottom = defaultBorder;
      } else {
        if (categoryInput) categoryInput.current.style.borderBottom = errorBorder;
      }

      if (errors.indexOf('quantity') === -1) {
        if (quantityInput) quantityInput.current.style.borderBottom = defaultBorder;
      } else {
        if (quantityInput) quantityInput.current.style.borderBottom = errorBorder;
      }

      if (errors.indexOf('url') === -1) {
        if (urlInput) urlInput.current.style.borderBottom = defaultBorder;
      } else {
        if (urlInput) urlInput.current.style.borderBottom = errorBorder;
      }
    }
  }, []);

  const validateInputs = useCallback(() => {
    const errors = [];

    if (!(url && isValidUrl(url))) {
      errors.push('url');
    }

    if (!quantity || isNaN(parseInt(quantity, 10)) || parseInt(quantity, 10) <= 0) {
      errors.push('quantity');
    }

    if (!category) {
      errors.push('category');
    }

    if (!name) {
      errors.push('name');
    }

    return errors;
  }, [category, name, url, quantity]);

  useEffect(() => {
    highlightErrors(validateInputs());
  }, [validateInputs, highlightErrors]);

  function clearInputs() {
    setName('');
    setCategory('');
    setQuantity('');
    setUrl('');
  }

  function isValidUrl(url) {
    try {
      return Boolean(new URL(url));
    } catch (e) {
      return false;
    }
  }

  function setDefaults() {
    if (errorDiv) errorDiv.current.style.display = 'none';
    if (nameInput) nameInput.current.style.borderBottom = defaultBorder;
    if (categoryInput) categoryInput.current.style.borderBottom = defaultBorder;
    if (quantityInput) quantityInput.current.style.borderBottom = defaultBorder;
    if (urlInput) urlInput.current.style.borderBottom = defaultBorder;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errors = validateInputs();
    if (errors.length) {
      highlightErrors(errors);
      return;
    }

    let promise;
    if (selectedRow) {
      promise = dispatch(updatePet({ id: selectedRow.id, name, category, quantity, url }));
    } else {
      promise = dispatch(createPet({ name, category, quantity, url }));
    }

    promise.then((response) => {
      if (response.payload.code >= 400) {
        toast.error(`Error saving record! ${response.payload.message}`);
      } else if (response.payload.code >= 200 && response.payload.code < 300) {
        toast.success('Record saved successfully');
        clearInputs();
        dispatch(hideModal());
      }
    });
  }

  return (
    <>
      <div ref={errorDiv} className='errors'>
        Please enter valid values for fields marked in red
      </div>
      <form className='form-inline' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input ref={nameInput} id='name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor='category'>Category</label>
        <input
          ref={categoryInput}
          id='category'
          type='text'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <label htmlFor='quantity'>Quantity</label>
        <input
          ref={quantityInput}
          id='quantity'
          type='number'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <label htmlFor='url'>Image URL</label>
        <input ref={urlInput} id='url' type='text' value={url} onChange={(e) => setUrl(e.target.value)} />
        <div className='btn-container'>
          <button className='primary' type='submit'>
            Save
          </button>
        </div>
      </form>
    </>
  );
}
