import './Contact.scss';

import { useDispatch, useSelector } from 'react-redux';
import {
  changeInputValue,
} from '../../store/messageSlice';

const cloudBaseUrl = import.meta.env.VITE_REACT_CLOUD_BASE_URL;

export default function Contact() {
  const dispatch = useDispatch();

  const inputValue = useSelector((state) => state.message.settings);
  const connectedUser = useSelector((state) => state.user.connected);

  const connectedId = (connectedUser ? connectedUser.id : 1);

  return (
    <div className="contact">
      <img
        src={`${cloudBaseUrl}dead-encounter-retouche_05.png`}
        alt="Zombie"
        className="contact__picture main-picture"
      />
      <div className="contact__main-title main-title">
        <h1>Contactez-nous</h1>
        <img
          src={`${cloudBaseUrl}dual-underline.png`}
          alt="underline"
          className="contact__main-title__underline underline"
        />
        <p>
          Des Questions? Contactez-nous pour des informations ou simplement pour
          partager vos impressions. Ensemble, survivons à ce monde nouveau.
        </p>
      </div>
      <div className="contact__form-section">
        <h2>Nous Contacter</h2>
        <form
          className="contact__form-section__form"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({
              type: 'POST_NEW_MESSAGE_TO_API',
              payload: connectedId,
            });
          }}
        >
          <input
            type="text"
            className="contact__form-section__form__subject"
            placeholder="Objet"
            value={inputValue.subjectValue}
            onChange={(e) => {
              dispatch(changeInputValue({subjectValue: e.target.value}));
            }}
          />
          <textarea
            className="contact__form-section__form__content"
            placeholder="Des questions, vos impressions, c'est ici."
            value={inputValue.contentValue}
            onChange={(e) => {
              dispatch(changeInputValue({contentValue: e.target.value}));
            }}
          />
          <div className="contact__form-section__form__message">
            {inputValue.message}
          </div>
          <button
            type="submit"
            className="contact__form-section__form__submit-button btn"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
