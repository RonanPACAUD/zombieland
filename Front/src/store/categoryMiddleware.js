import { resetCategoryState, updateCategoryList } from './categorySlice';

const categoryMiddleware = (store) => (next) => (action) => {
  const state = store.getState();

  if (action.type === 'GET_ALL_CATEGORIES') {
    fetch('http://localhost:3000/category')
      .then((response) => response.json())
      .then((data) => {
        store.dispatch(updateCategoryList(data));
      });
  }

  if (action.type === 'POST_NEW_CATEGORY_TO_API') {
    fetch('http://localhost:3000/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        name: state.category.settings.name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        store.dispatch(resetCategoryState());
        store.dispatch({ type: 'GET_ALL_CATEGORIES' });
      });
  }

  if (action.type === 'DELETE_CATEGORY') {
    fetch(`http://localhost:3000/category/${action.payload}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        store.dispatch({ type: 'GET_ALL_CATEGORIES' });
      });
  }

  next(action);
};

export default categoryMiddleware;
