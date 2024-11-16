
const apiUrl = import.meta.env.VITE_REACT_APP_API_URL

import { changeInputValue, resetConnexionState } from './connexionSlice';
import { resetInscriptionState } from './inscriptionSlice';
import { toogleMainModal } from './modalSlice';
import { updateConnectedUser } from './userSlice';

const connexionMiddleware = (store) => (next) => (action) => {
  const state = store.getState();

  if (action.type === 'POST_CONNEXION_DATA_TO_API') {
    fetch(`${apiUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        email: state.connexion.settings.emailValue,
        password: state.connexion.settings.passwordValue,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        store.dispatch(changeInputValue({message: data.message}));
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('connectedUser', JSON.stringify(data.userSafe));
          store.dispatch(updateConnectedUser(data.userSafe));
          store.dispatch(toogleMainModal());
          store.dispatch(resetConnexionState());
        }
      });
  }

  if (action.type === 'POST_CONNEXION_DATA_TO_API_FROM_INSCRIPTION') {
    fetch(`${apiUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        email: state.inscription.settings.emailValue,
        password: state.inscription.settings.passwordValue,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        store.dispatch(changeInputValue({message: data.message}));
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('connectedUser', JSON.stringify(data.userSafe));
          store.dispatch(updateConnectedUser(data.userSafe));
          store.dispatch(toogleMainModal());
          store.dispatch(resetInscriptionState());

        }
      });
  }

  next(action);
};

export default connexionMiddleware;
