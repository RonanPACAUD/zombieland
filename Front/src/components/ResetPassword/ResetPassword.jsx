import './ResetPassword.scss';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { changeInputValue } from '../../store/inscriptionSlice';

export default function ResetPassword() {
  const dispatch = useDispatch();

  const inputValue = useSelector((state) => state.inscription.settings);

  console.log(inputValue);

  return (
    <div className="reset-password">
      <h2>Modifier mon mot de passe</h2>
      <form
        className="reset-password__form"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: 'POST_RESET_PASSWORD_DATA_TO_API' });
        }}
      >
        <h3>Ancien mot de passe</h3>
        <input
          type="password"
          className="reset-password__form__input-email"
          maxLength="30"
          value={inputValue.passwordValue}
          onChange={(e) => {
            dispatch(changeInputValue({ passwordValue: e.target.value }));
          }}
        />
        <h3>Nouveau mot de passe</h3>
        <input
          type="password"
          className="reset-password__form__input-email"
          maxLength="30"
          value={inputValue.newPasswordValue}
          onChange={(e) => {
            dispatch(changeInputValue({ newPasswordValue: e.target.value }));
          }}
        />
        <h3>Confirmation nouveau mot de passe</h3>
        <input
          type="password"
          className="reset-password__form__input-email"
          maxLength="30"
          value={inputValue.confirmPasswordValue}
          onChange={(e) => {
            dispatch(changeInputValue({ confirmPasswordValue: e.target.value }));
          }}
        />
        <div className="reset-password__form__message">{inputValue.message}</div>
        <div className="reset-password__form__button-container">
          <button
            type="submit"
            className="reset-password__form__button-container__submit-button btn"
          >
            Modifier
          </button>
        </div>
      </form>
    </div>
  );
}
