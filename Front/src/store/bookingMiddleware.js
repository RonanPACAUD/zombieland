
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL

import {
  changeInputValue,
  changeMessageValue,
  resetBookingState,
  updateBookingsList,
  updateSelectedBooking,
} from './bookingSlice';

const bookingMiddleware = (store) => (next) => (action) => {
  const state = store.getState();

  if (action.type === 'GET_ALL_BOOKINGS') {
    fetch(`${apiUrl}/booking`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        store.dispatch(updateBookingsList(data));
      });
  }

  if (action.type === 'GET_ONE_BOOKING') {
    fetch(`${apiUrl}/booking/${action.payload}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        store.dispatch(updateSelectedBooking(data));
      });
  }

  if (action.type === 'POST_NEW_BOOKING_TO_API') {
    fetch(`${apiUrl}/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),

      },
      body: JSON.stringify({
        start_date: state.booking.settings.startDateValue,
        duration: state.booking.settings.durationValue,
        nb_people: state.booking.settings.ticketValue,
        hotel: state.booking.settings.hotelValue,
        total: state.booking.settings.totalValue,
        user_id: action.payload,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          store.dispatch(resetBookingState());
        }
        return response.json()
      })
      .then((data) => {
        store.dispatch(changeInputValue({message: data.message}));
      });
  }

  if (action.type === 'MODIFY_BOOKING_TO_API') {
    console.log(action.payload)

    fetch(`${apiUrl}/booking/${action.payload.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        start_date: action.payload.start_date,
        duration: action.payload.duration,
        nb_people: action.payload.nb_people,
        hotel: action.payload.hotelValue,
        total: action.payload.total,
        closed: action.payload.closed,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        store.dispatch(updateSelectedBooking(data));
        store.dispatch({ type: 'GET_ALL_BOOKINGS' });
      });
  }

  if (action.type === 'DELETE_BOOKING') {
    fetch(`${apiUrl}/booking/${action.payload}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then(() => {
        store.dispatch({ type: 'GET_ALL_BOOKINGS' });
      });
  }

  next(action);
};

export default bookingMiddleware;
