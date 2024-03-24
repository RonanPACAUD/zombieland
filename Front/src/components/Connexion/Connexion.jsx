import './Connexion.scss';

import { useDispatch, useSelector } from 'react-redux';

import { showInscriptionModal } from '../../store/modalSlice';
import {
  changeInputValue,
} from '../../store/connexionSlice';

export default function Connexion() {
  const dispatch = useDispatch();

  const inputValue = useSelector((state) => state.connexion.settings); 

  return (
    <div className="connexion">
      <h1>Connexion</h1>
      <img src={'https://storage.googleapis.com/zombieland-assets/dual-underline.png'} alt="underline" className="connexion__underline" />
      <form
        className="connexion__form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: 'POST_CONNEXION_DATA_TO_API' });
        }}
      >
        <h3>Email</h3>
        <input
          type="email"
          className="connexion__form__input-email"
          maxLength="255"
          value={inputValue.emailValue}
          onChange={(e) => {
            dispatch(changeInputValue({emailValue: e.target.value}));
          }}
        />
        <h3>Mot de passe</h3>
        <input
          type="password"
          className="connexion__form__input-email"
          maxLength="30"
          value={inputValue.passwordValue}
          onChange={(e) => {
            dispatch(changeInputValue({passwordValue: e.target.value}));
          }}
        />
        <div className="connexion__form__message">{inputValue.message}</div>
        <div className="connexion__form__button-container">
          <button
            type="submit"
            className="connexion__form__button-container__submit-button btn"
          >
            Se connecter
          </button>
        </div>
      </form>
      <div className="connexion__inscription-link">
        Pas encore de compte ?
        <button
          className="connexion__inscription-link__button"
          onClick={() => {
            dispatch(showInscriptionModal());
          }}
        >
          Je m'inscris
        </button>
      </div>
    </div>
  );
}
