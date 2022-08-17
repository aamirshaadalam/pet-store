import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:3001/v1';

export const fetchPets = createAsyncThunk('pets/fetchPets', async (pagination, { rejectWithValue }) => {
  try {
    const { start, limit } = pagination;

    if (limit > 100) {
      return rejectWithValue({
        code: 400,
        message: 'Limit exceeded the allowed value. Please provide a number less than or equal to 100',
      });
    }

    const query = `start=${start}&limit=${limit}`;
    const response = await axios.get(`${baseURL}/pets?${query}`);
    return {
      data: response.data,
      totalRecords: parseInt(response.headers['x-total-count'], 10),
      code: response.status,
      message: response.statusText,
    };
  } catch (error) {
    return rejectWithValue({ code: error.response.status, message: error.response.statusText });
  }
});

export const fetchPetById = createAsyncThunk('pets/fetchPetById', async (petId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${baseURL}/pets/${petId}`);
    return { data: response.data, code: response.status, message: response.statusText };
  } catch (error) {
    return rejectWithValue({ code: error.response.status, message: error.response.statusText });
  }
});

export const createPet = createAsyncThunk('pets/createPet', async (pet, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${baseURL}/pets`, pet);
    return { data: response.data, code: response.status, message: response.statusText };
  } catch (error) {
    return rejectWithValue({ code: error.response.status, message: error.response.statusText });
  }
});

export const updatePet = createAsyncThunk('pets/updatePet', async (pet, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${baseURL}/pets/${pet.id}`, pet);
    return { data: response.data, code: response.status, message: response.statusText };
  } catch (error) {
    return rejectWithValue({ code: error.response.status, message: error.response.statusText });
  }
});

export const deletePet = createAsyncThunk('pets/deletePet', async (petId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${baseURL}/pets/${petId}`);
    return { data: response.data, code: response.status, message: response.statusText };
  } catch (error) {
    return rejectWithValue({ code: error.response.status, message: error.response.statusText });
  }
});

const initialState = {
  totalRecords: 0,
  isLoading: false,
  refetchData: true,
};

export const petSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    setTotalRecords: (state, { payload }) => {
      state.totalRecords = parseInt(payload, 10);
    },
    setRefetchData: (state, { payload }) => {
      state.refetchData = payload;
    },
  },
  extraReducers: {
    [fetchPets.fulfilled]: (state, { payload }) => {
      const { totalRecords } = payload;
      state.isLoading = false;
      state.totalRecords = parseInt(totalRecords, 10);
      state.refetchData = false;
    },
    [fetchPets.pending]: (state) => {
      state.isLoading = true;
      state.refetchData = false;
    },
    [fetchPets.rejected]: (state) => {
      state.isLoading = false;
      state.refetchData = false;
    },
    [createPet.fulfilled]: (state) => {
      state.totalRecords += 1;
      state.isLoading = false;
      state.refetchData = true;
    },
    [createPet.pending]: (state) => {
      state.isLoading = true;
    },
    [createPet.rejected]: (state) => {
      state.isLoading = false;
    },
    [deletePet.fulfilled]: (state) => {
      state.totalRecords -= 1;
      state.isLoading = false;
      state.refetchData = true;
    },
    [deletePet.pending]: (state) => {
      state.isLoading = true;
    },
    [deletePet.rejected]: (state) => {
      state.isLoading = false;
    },
    [updatePet.fulfilled]: (state) => {
      state.isLoading = false;
      state.refetchData = true;
    },
    [updatePet.pending]: (state) => {
      state.isLoading = true;
    },
    [updatePet.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

// actions
export const { setTotalRecords, setRefetchData } = petSlice.actions;

// selectors
export const getTotalRecords = (state) => state.pets.totalRecords;
export const getLoadingStatus = (state) => state.pets.isLoading;
export const getRefetchStatus = (state) => state.pets.refetchData;

// reducers
export default petSlice.reducer;
