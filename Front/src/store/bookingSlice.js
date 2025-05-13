import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  settings: {
    startDateValue: '',
    durationValue: 1,
    hotelValue: false,
    ticketValue: 1,
    totalValue: 0,
    user_id: 1,
    message: '',
  },
  bookingsList: [],
  selected: {
    booking_id: 0,
    startDateValue: '',
    durationValue: 1,
    hotelValue: false,
    ticketValue: 1,
    totalValue: 0,
    user_id: 1,
    closed: false,
  },
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    changeInputValue: (state, action) => {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };
    },

    resetBookingState: (state) => {
      return {
        ...state,
        settings: {
          ...state.settings,
          startDateValue: '',
          durationValue: 1,
          hotelValue: false,
          ticketValue: 1,
          totalValue: 0,
        },
      };
    },

    updateBookingsList: (state, action) => {
      return {
        ...state,
        bookingsList: action.payload,
      };
    },

    updateSelectedBooking: (state, action) => {
      return {
        ...state,
        selected: {
          ...state.selected,
          booking_id: action.payload.id,
          startDateValue: action.payload.start_date,
          durationValue: action.payload.duration,
          hotelValue: action.payload.hotel,
          ticketValue: action.payload.nb_people,
          totalValue: action.payload.total,
          user_id: action.payload.user_id,
          closed: action.payload.closed,
        },
      };
    },
  },
});

export const {
  changeInputValue,
  changeMessageValue,
  updateBookingsList,
  resetBookingState,
  updateSelectedBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
