import './Inscription.scss';

import { useDispatch, useSelector } from 'react-redux';

import { changeInputValue } from '../../store/inscriptionSlice';

export default function Inscription() {
  const dispatch = useDispatch();

  const inputValue = useSelector((state) => state.inscription.settings);

  return (
    <div className="inscription">
      <h1>Inscription</h1>
      <img src={'https://storage.googleapis.com/zombieland-assets/dual-underline.png'} alt="underline" className="inscription__underline" />
      <form
        className="inscription__form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: 'POST_NEW_USER_TO_API' });
        }}
      >
        <div className="inscription__form__input-container">
          <div className="inscription__form__input-container__first-column">
            <h3>Prénom</h3>
            <input
              type="text"
              className="inscription__form__input-container__first-column__input-first-name"
              placeholder="ex: Jean-Claude"
              maxLength="64"
              value={inputValue.firstNameValue}
              onChange={(e) => {
                dispatch(changeInputValue({ firstNameValue: e.target.value }));
              }}
            />
            <h3>Nom</h3>
            <input
              type="text"
              className="inscription__form__input-container__first-column__input-last-name"
              placeholder="ex: Dupont"
              maxLength="64"
              value={inputValue.lastNameValue}
              onChange={(e) => {
                dispatch(changeInputValue({ lastNameValue: e.target.value }));
              }}
            />
            <h3>Email</h3>
            <input
              type="email"
              className="inscription__form__input-container__first-column__input-email"
              placeholder="exemple@exemplemail.com"
              maxLength="255"
              value={inputValue.emailValue}
              onChange={(e) => {
                dispatch(changeInputValue({ emailValue: e.target.value }));
              }}
            />
            <h3>Adresse</h3>
            <input
              type="text"
              className="inscription__form__input-container__first-column__input-address"
              placeholder="ex: 12 rue de la forêt"
              maxLength="255"
              value={inputValue.addressValue}
              onChange={(e) => {
                dispatch(changeInputValue({ addressValue: e.target.value }));
              }}
            />
          </div>
          <div className="inscription__form__input-container__second-column">
            <h3>Ville</h3>
            <input
              type="text"
              className="inscription__form__input-container__second-column__input-city"
              placeholder="ex: Paris"
              maxLength="64"
              value={inputValue.cityValue}
              onChange={(e) => {
                dispatch(changeInputValue({ cityValue: e.target.value }));
              }}
            />
            <h3>Pays</h3>
            <input
              type="country"
              className="inscription__form__input-container__second-column__input-country"
              placeholder="ex: France"
              maxLength="64"
              value={inputValue.countryValue}
              onChange={(e) => {
                dispatch(changeInputValue({ countryValue: e.target.value }));
              }}
            />
            <h3>Mot de passe</h3>
            <input
              type="password"
              className="inscription__form__input-container__second-column__input-email"
              placeholder="min 8, 1 nombre, 1 min, 1 Maj, 1 symbol"
              maxLength="30"
              value={inputValue.passwordValue}
              onChange={(e) => {
                dispatch(changeInputValue({ passwordValue: e.target.value }));
              }}
            />
            <h3>Confirmation mot de passe</h3>
            <input
              type="password"
              className="inscription__form__input-container__second-column__input-email"
              placeholder="Confirmation du mot de passe"
              maxLength="30"
              value={inputValue.confirmPasswordValue}
              onChange={(e) => {
                dispatch(
                  changeInputValue({ confirmPasswordValue: e.target.value })
                );
              }}
            />
          </div>
        </div>
        <div className="inscription__form__message">{inputValue.message}</div>
        <div className="inscription__form__button-container">
          <button
            type="submit"
            className="inscription__form__button-container__submit-button btn"
          >
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  );
}
