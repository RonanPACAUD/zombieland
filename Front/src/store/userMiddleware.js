const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

import {
  updateConnectedUser,
  updateSelectedUser,
  updateUsersList,
} from './userSlice';

const userMiddleware = (store) => (next) => (action) => {
  if (action.type === 'GET_ALL_USERS') {
    fetch(`${apiUrl}/user`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        store.dispatch(updateUsersList(data));
      });
  }

  if (action.type === 'GET_ONE_USER') {
    fetch(`${apiUrl}/user/${action.payload}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        store.dispatch(updateSelectedUser(data));
      });
  }

  if (action.type === 'UPDATE_CONNECTED_USER') {
    console.log(action.payload);
    fetch(`${apiUrl}/user/${action.payload}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        store.dispatch(updateConnectedUser(data));
      });
  }

  if (action.type === 'MODIFY_USER_TO_API') {
    fetch(`${apiUrl}/user/${action.payload.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        email: action.payload.email,
        address: action.payload.address,
        city: action.payload.city,
        country: action.payload.country,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        store.dispatch(updateSelectedUser(data));
        store.dispatch({ type: 'GET_ALL_USERS' });
      });
  }

  if (action.type === 'DELETE_USER') {
    fetch(`${apiUrl}/user/${action.payload}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then(() => {
        store.dispatch({ type: 'GET_ALL_USERS' });
      });
  }

  next(action);
};

export default userMiddleware;
