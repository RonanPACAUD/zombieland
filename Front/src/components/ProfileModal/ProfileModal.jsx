import { useDispatch } from 'react-redux';
import './ProfileModal.scss';
import { useSelector } from 'react-redux';


export default function ProfileModal() {
    const dispatch = useDispatch();

    const selectedUser = useSelector((state) => state.user.selectedUser);
    const connectedUser = useSelector((state) => state.user.connected);

  return (
    <div className="profil-modal">
      <h2>Modifier Utilisateur</h2>

      <form className="profil-modal__form">
         <div className="profil-modal__form__input-container">

          <div className="profil-modal__form__input-container__first-column">
            <h3>Prénom</h3>
            <input
              type="text"
              className="profil-modal__form__input-container__first-column__input-first-name"
              maxLength="64"
              value={selectedUser.first_name}
              onChange={(e) => {
                dispatch({
                  type: 'MODIFY_USER_TO_API',
                  payload: {
                    id: selectedUser.id,
                    first_name: e.target.value,
                  },
                });
                dispatch({ type: 'UPDATE_CONNECTED_USER', payload: connectedUser.id})
              }}
            />
            <h3>Nom</h3>
            <input
              type="text"
              className="profil-modal__form__input-container__first-column__input-last-name"
              maxLength="64"
              value={selectedUser.last_name}
              onChange={(e) => {
                dispatch({
                  type: 'MODIFY_USER_TO_API',
                  payload: {
                    id: selectedUser.id,
                    last_name: e.target.value,
                  },
                });
                dispatch({ type: 'UPDATE_CONNECTED_USER', payload: connectedUser.id})
              }}
            />
            <h3>Email</h3>
            <input
              type="email"
              className="profil-modal__form__input-container__first-column__input-email"
              placeholder="exemple@exemplemail.com"
              maxLength="255"
              value={selectedUser.email}
              onChange={(e) => {
                dispatch({
                  type: 'MODIFY_USER_TO_API',
                  payload: {
                    id: selectedUser.id,
                    email: e.target.value,
                  },
                });
                dispatch({ type: 'UPDATE_CONNECTED_USER', payload: connectedUser.id})
              }}
            />
          </div>
          <div className="profil-modal__form__input-container__second-column">
            <h3>Adresse</h3>
            <input
              type="text"
              className="profil-modal__form__input-container__first-column__input-address"
              placeholder="ex: 12 rue de la forêt"
              maxLength="255"
              value={selectedUser.address}
              onChange={(e) => {
                dispatch({
                  type: 'MODIFY_USER_TO_API',
                  payload: {
                    id: selectedUser.id,
                    address: e.target.value,
                  },
                });
                dispatch({ type: 'UPDATE_CONNECTED_USER', payload: connectedUser.id})
              }}
            />
            <h3>Ville</h3>
            <input
              type="text"
              className="profil-modal__form__input-container__second-column__input-city"
              placeholder="ex: Paris"
              maxLength="64"
              value={selectedUser.city}
              onChange={(e) => {
                dispatch({
                  type: 'MODIFY_USER_TO_API',
                  payload: {
                    id: selectedUser.id,
                    city: e.target.value,
                  },
                });
                dispatch({ type: 'UPDATE_CONNECTED_USER', payload: connectedUser.id})
              }}
            />
            <h3>Pays</h3>
            <input
              type="country"
              className="profil-modal__form__input-container__second-column__input-country"
              placeholder="ex: France"
              maxLength="64"
              value={selectedUser.country}
              onChange={(e) => {
                dispatch({
                  type: 'MODIFY_USER_TO_API',
                  payload: {
                    id: selectedUser.id,
                    country: e.target.value,
                  },
                });
                dispatch({ type: 'UPDATE_CONNECTED_USER', payload: connectedUser.id})
              }}
            />
      
          </div>
        </div>
        {/* <div className="inscription__form__message">{inscriptionMessage}</div> */}
      </form>
    </div>
  );
}
