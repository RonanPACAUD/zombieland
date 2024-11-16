import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  connected: '',
  userLIst: [],
  selectedUser: {
    id: 0,
    first_name: '',
    last_name: '',
    address: '',
    city: '',
    country: '',
    email: '',
    role: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUsersList: (state, action) => {
      return {
        ...state,
        userList: action.payload,
      };
    },

    updateConnectedUser: (state, action) => {
      return {
        ...state,
        connected: {
          ...state.connected,
          id: action.payload.id,
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
          address: action.payload.address,
          city: action.payload.city,
          country: action.payload.country,
          email: action.payload.email,
          role: action.payload.role,
          connected: true,
          bookings: action.payload.bookings
        },
      };
    },

    updateSelectedUser: (state, action) => {
      return {
        ...state,
        selectedUser: {
          ...state.selected,
          id: action.payload.id,
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
          address: action.payload.address,
          city: action.payload.city,
          country: action.payload.country,
          email: action.payload.email,
          role: action.payload.role,
        },
      };
    },

    resetConnectedUser: (state) => {
      localStorage.clear();

      return {
        ...state,
        connected: ''
      }
    },
  },
});

export const {
  updateConnectedUser,
  updateUsersList,
  updateSelectedUser,
  resetConnectedUser,
} = userSlice.actions;

export default userSlice.reducer;
