import { resetPriceState, updatePriceList } from './priceSlice';

const priceMiddleware = (store) => (next) => (action) => {
  const state = store.getState();

  if (action.type === 'GET_PRICES_FROM_API') {
    fetch('http://localhost:3000/price')
      .then((response) => response.json())
      .then((data) => {
        store.dispatch(updatePriceList(data));
      });
  }

  if (action.type === 'POST_NEW_PRICE_TO_API') {
    fetch('http://localhost:3000/price', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        hotel: state.price.settings.hotel,
        duration: state.price.settings.duration,
        price: state.price.settings.price,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        store.dispatch(resetPriceState())
        store.dispatch({ type: 'GET_PRICES_FROM_API' });
      });
  }

  if (action.type === 'DELETE_PRICE') {
    fetch(`http://localhost:3000/price/${action.payload}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    })
      .then((response) => response.json())
      .then(() => {
        store.dispatch({ type: 'GET_PRICES_FROM_API' });
      });
  }

  next(action);
};

export default priceMiddleware;
