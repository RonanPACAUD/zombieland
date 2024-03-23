import './AdminUser.scss';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { showAdminUserModal } from '../../../store/modalSlice';

import {
  changeInputValue
} from '../../../store/inscriptionSlice';

export default function AdminUser() {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.user.userList);

  const inputValue = useSelector((state) => state.inscription.settings);

  useEffect(() => {
    dispatch({ type: 'GET_ALL_USERS' });
  }, []);

  return (
    <div className="admin-user">
      <h2>Utilisateurs</h2>
      <div className="admin-user__null-message">
        {/* {userList.length === 0 && <h3>Aucun utilisateur</h3>} */}
      </div>
      <div className="admin-user__list-container">
        {userList &&
          userList.map((user) => (
            <div key={user.id} className="admin-user__list-container__item">
              <div className="admin-user__list-container__item__role">
                {user.role}
              </div>
              <div className="admin-user__list-container__item__user-info">
                <div className="admin-user__list-container__item__user-info__name-email-container">
                  <div className="admin-user__list-container__item__user-info__name-email-container__name">
                    <span>Nom: </span>
                    {user.first_name} {user.last_name}
                  </div>
                  <div className="admin-user__list-container__item__user-info__name-email-container__email">
                    <span>Email: </span>
                    {user.email}
                  </div>
                </div>
                <div className="admin-user__list-container__item__user-info__address">
                  <div className="admin-user__list-container__item__user-info__address__address">
                    <span>Adresse: </span>
                    {user.address}
                  </div>
                  <div className="admin-user__list-container__item__user-info__address__city">
                    <span>Ville: </span>
                    {user.city}
                  </div>
                  <div className="admin-user__list-container__item__user-info__address__country">
                    <span>Pays: </span>
                    {user.country}
                  </div>
                </div>
              </div>
              <div className="admin-user__list-container__item__buttons">
                <button
                  className=""
                  value={user.id}
                  onClick={(e) => {
                    dispatch({
                      type: 'GET_ONE_USER',
                      payload: e.target.value,
                    });
                    dispatch(showAdminUserModal());
                  }}
                >
                  Modifier
                </button>
                <button
                  className=""
                  value={user.id}
                  onClick={(e) => {
                    dispatch({
                      type: 'DELETE_USER',
                      payload: e.target.value,
                    });
                  }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className="admin-user__add-user">
        <h3>Créer un utilisateur</h3>
        <form
          className="admin-user__add-user__add-form"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({ type: 'CREATE_NEW_USER_TO_API' });
          }}
        >
          <div className="admin-user__add-user__add-form__input-container__role">
            <h3>Role</h3>
            <select
              name="select-duration"
              id="select-duration"
              value={inputValue.roleValue}
              onChange={(e) => {
                dispatch(changeInputValue({ role: e.target.value }));
              }}
            >
              <option value="membre">Membre</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>
          <div className="admin-user__add-user__add-form__input-container">
            <div className="admin-user__add-user__add-form__input-container__first-column">
              <h3>Prénom</h3>
              <input
                type="text"
                className="admin-user__add-user__add-form__input-container__first-column__input-first-name"
                placeholder="ex: Jean-Claude"
                maxLength="64"
                value={inputValue.firstNameValue}
                onChange={(e) => {
                  dispatch(
                    changeInputValue({ firstNameValue: e.target.value })
                  );
                }}
              />
              <h3>Nom</h3>
              <input
                type="text"
                className="admin-user__add-user__add-form__input-container__first-column__input-last-name"
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
                className="admin-user__add-user__add-form__input-container__first-column__input-email"
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
                className="admin-user__add-user__add-form__input-container__first-column__input-address"
                placeholder="ex: 12 rue de la forêt"
                maxLength="255"
                value={inputValue.addressValue}
                onChange={(e) => {
                  dispatch(changeInputValue({ addressValue: e.target.value }));
                }}
              />
            </div>
            <div className="admin-user__add-user__add-form__input-container__second-column">
              <h3>Ville</h3>
              <input
                type="text"
                className="admin-user__add-user__add-form__input-container__second-column__input-city"
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
                className="admin-user__add-user__add-form__input-container__second-column__input-country"
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
                className="admin-user__add-user__add-form__input-container__second-column__input-email"
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
                className="admin-user__add-user__add-form__input-container__second-column__input-email"
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
          <div className="admin-user__add-user__add-form__message">
            {inputValue.message}
          </div>
          <div className="admin-user__add-user__add-form__button-container">
            <button
              type="submit"
              className="admin-user__add-user__add-form__button-container__submit-button btn"
            >
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
