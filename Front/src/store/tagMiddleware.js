
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL

import { updateSelectedAttraction } from './attractionSlice';
import { resetTagState, updatetagsList } from './tagSlice';

const tagMiddleware = (store) => (next) => (action) => {
  const state = store.getState();

  if (action.type === 'GET_ALL_TAGS') {
    fetch(`${apiUrl}/tag`)
      .then((response) => response.json())
      .then((data) => {
        store.dispatch(updatetagsList(data));
      });
  }

  if (action.type === 'POST_NEW_TAG_TO_API') {
    fetch(`${apiUrl}/tag`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        name: state.tag.settings.name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        store.dispatch(resetTagState())
        store.dispatch({ type: 'GET_ALL_TAGS' });
      });
  }

  if (action.type === 'DELETE_TAG') {
    fetch(`${apiUrl}/tag/${action.payload}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        store.dispatch({ type: 'GET_ALL_TAGS' });
      });
  }

  if (action.type === 'ADD_TAG_TO_ATTRACTION') {
    fetch(`${apiUrl}/attraction/${action.payload.attraction_id}/tag/${action.payload.tag_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        store.dispatch(updateSelectedAttraction(data));
        store.dispatch({ type: 'GET_ALL_ATTRACTIONS' });
      });
  }

  if (action.type === 'DELETE_TAG_FROM_ATTRACTION') {
    fetch(`${apiUrl}/attraction/${action.payload.attraction_id}/tag/${action.payload.tag_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        store.dispatch(updateSelectedAttraction(data));
        store.dispatch({ type: 'GET_ALL_ATTRACTIONS' });
      });
  }


  next(action);
};

export default tagMiddleware;
