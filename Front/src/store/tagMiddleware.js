import { updateAttractionList, updateSelectedAttraction } from './attractionSlice';
import { resetTagState, updatetagsList } from './tagSlice';

const tagMiddleware = (store) => (next) => (action) => {
  const state = store.getState();

  if (action.type === 'GET_ALL_TAGS') {
    fetch('http://localhost:3000/tag')
      .then((response) => response.json())
      .then((data) => {
        store.dispatch(updatetagsList(data));
      });
  }

  if (action.type === 'POST_NEW_TAG_TO_API') {
    fetch('http://localhost:3000/tag', {
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
    fetch(`http://localhost:3000/tag/${action.payload}`, {
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
    fetch(`http://localhost:3000/attraction/${action.payload.attraction_id}/tag/${action.payload.tag_id}`, {
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
    fetch(`http://localhost:3000/attraction/${action.payload.attraction_id}/tag/${action.payload.tag_id}`, {
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
