import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchPets, getLoadingStatus, setTotalRecords, getTotalRecords, deletePet, getRefetchStatus } from './petSlice';
import { showModal, setSelectedRow } from '../../components/modalSlice';
import { getPageSize, getCurrentPage, setCurrentPage, getPageCount } from '../../components/paginationSlice';
import BusyIndicator from '../../components/busyIndicator';
import Table from '../../components/table';
import Modal from '../../components/modal';
import AddPet from './addPet';
import '../../styles/pets.scss';

export default function Pets() {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoadingStatus);
  const needRefetch = useSelector(getRefetchStatus);
  const pageSize = useSelector(getPageSize);
  const pageNumber = useSelector(getCurrentPage);
  const pageCount = useSelector(getPageCount);
  const totalRecords = useSelector(getTotalRecords);
  const [pets, setPets] = useState([]);

  const toolbarConfig = [{ name: 'add', action: openModal, tooltip: 'Add new record' }];

  const paginationConfig = {
    pageSizeOptions: [10, 25, 50, 100],
    defaultPageSize: 10,
    totalRecords,
  };

  const columns = [
    {
      name: 'name',
      type: 'link',
      baseUrl: '/pets',
    },
    {
      name: 'category',
      type: 'string',
    },
    {
      name: 'quantity',
      type: 'number',
    },
    {
      name: '',
      type: 'icon',
      action: openModal,
      class: 'icon-edit',
      title: 'Edit this Record',
    },
    {
      name: '',
      type: 'icon',
      action: onDeleteClick,
      class: 'icon-delete',
      title: 'Delete selected records',
    },
  ];

  const fetchPetList = useCallback(() => {
    dispatch(
      fetchPets({
        pageSize,
        pageNumber,
      })
    ).then((response) => {
      if (response) {
        const { data, code, message, totalRecords } = response.payload;

        if (code >= 400) {
          toast.error(`Error fetching data! ${message}`);
          setPets([]);
          dispatch(setTotalRecords(0));
        } else if (code >= 200 && code < 300) {
          setPets(data);
          dispatch(setTotalRecords(totalRecords));
        }
      }
    });
  }, [dispatch, pageSize, pageNumber]);

  useEffect(() => {
    if (needRefetch) {
      if (pageNumber > pageCount) {
        dispatch(setCurrentPage(pageNumber - 1));
      }
    }
    fetchPetList();
  }, [fetchPetList, dispatch, needRefetch, pageNumber, pageCount]);

  function openModal(pet) {
    if (pet) {
      dispatch(setSelectedRow(pet));
    } else {
      dispatch(setSelectedRow(null));
    }
    dispatch(showModal());
  }

  function onDeleteClick(pet) {
    dispatch(deletePet(pet.id));
  }

  return (
    <div className='pets-container'>
      <Modal>
        <AddPet />
      </Modal>
      {isLoading ? (
        <BusyIndicator />
      ) : (
        <Table data={pets} columns={columns} toolbarConfig={toolbarConfig} paginationConfig={paginationConfig} />
      )}
    </div>
  );
}
