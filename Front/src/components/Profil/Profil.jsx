import './Profil.scss';

import { useSelector } from 'react-redux';
import { showModifyProfilModal, showResetPasswordModal } from '../../store/modalSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const cloudBaseUrl = import.meta.env.VITE_REACT_CLOUD_BASE_URL;

export default function Profil() {
  const dispatch = useDispatch();

  const connectedUser = useSelector((state) => state.user.connected);

  useEffect(() => {
    dispatch({ type: 'GET_ALL_USERS' });
    dispatch({
      type: 'UPDATE_CONNECTED_USER',
      payload: JSON.parse(localStorage.getItem('connectedUser')).id,
    });
  }, []);

  function calculExpirationDate(booking) {
    const localDate = new Date();

    const bookingDate = new Date(booking.start_date);

    const timeBeforeExpiration =
      (bookingDate - localDate) / (1000 * 60 * 60 * 24);

    if (timeBeforeExpiration > 10) {
      return (
        <>
          <div className="profil__list-container__item__buttons-container__expiration-message">
            Il vous reste {Math.ceil(timeBeforeExpiration) - 10} jours pour
            annuler la réservation
          </div>
          <button
            className="profil__list-container__item__buttons-container__button"
            value={booking.id}
            onClick={(e) => {
              dispatch({
                type: 'DELETE_BOOKING',
                payload: parseInt(e.target.value),
              });
              dispatch({
                type: 'UPDATE_CONNECTED_USER',
                payload: JSON.parse(localStorage.getItem('connectedUser')).id,
              });
            }}
          >
            Annuler
          </button>
        </>
      );
    } else {
      return (
        <>
          <div className="profil__list-container__item__buttons-container__expiration-message">
            Vous ne pouvez plus annuler la réservation
          </div>
          <button className="profil__list-container__item__buttons-container__button">
            <div className="profil__list-container__item__buttons-container__expiration-block"></div>
            Annuler
          </button>
        </>
      );
    }
  }

  return (
    <div className="profil">
      <img
        src={`${cloudBaseUrl}Firefly_d%C3%A9taill%C3%A9_parc_attraction_restaurant_fast_food_rouge_brume_orageux_sombre_vue_exterieure_mont_2.jpg`}
        alt="Zombie"
        className="profil__picture main-picture"
      />
      <div className="profil__main-title main-title">
        <h1>Mon Profil</h1>
        <img
          src={`${cloudBaseUrl}dual-underline.png`}
          alt="underline"
          className="profil__main-title__underline underline"
        />
        <p>
          Préparez-vous à plonger dans l'inconnu et à découvrir un monde où le
          frisson est roi ! Retrouvez ici toutes vos informations personnelles.
        </p>
      </div>
      <div className="profil__main">
        <h2>Profil</h2>
        <div className="profil__main__profil-container">
          <div className="profil__main__profil-container__item">
            <span>Prénom:</span> <div>{connectedUser.first_name}</div>
          </div>
          <div className="profil__main__profil-container__item">
            <span>Nom:</span> <div>{connectedUser.last_name}</div>
          </div>
          <div className="profil__main__profil-container__item">
            <span>Email:</span> <div>{connectedUser.email}</div>
          </div>
          <div className="profil__main__profil-container__item">
            <span>Adresse:</span> <div>{connectedUser.address}</div>
          </div>
          <div className="profil__main__profil-container__item">
            <span>Ville:</span> <div>{connectedUser.city}</div>
          </div>
          <div className="profil__main__profil-container__item">
            <span>Pays:</span> <div>{connectedUser.country}</div>
          </div>
        </div>
        <div className="profil__main__option-container">
          <button
            className="profil__main__option-container__option-button"
            onClick={() => {
              dispatch({
                type: 'GET_ONE_USER',
                payload: connectedUser.id,
              });
              dispatch(showModifyProfilModal());
            }}
          >
            Modifier mon profil
          </button>
          <button
            className="profil__main__option-container__option-button"
            onClick={() => {
              dispatch(showResetPasswordModal())
            }}
          >
            Modifier mon mot de passe
          </button>
        </div>
        <h2>Mes réservations</h2>
        <p>
          Vous pouvez annuler vos réservations jusqu'a 10 jours avant la date
        </p>
        <div className="profil__list-container">
          {connectedUser.bookings &&
            connectedUser.bookings.map((booking) => (
              <div key={booking.id} className="profil__list-container__item">
                {booking.closed && (
                  <div className="profil__list-container__item__after"></div>
                )}

                <div className="profil__list-container__item__booking">
                  Pour <span>{booking.nb_people}</span> <br />A partir du :{' '}
                  <span>{booking.start_date}</span> <br />
                  Pour un durée de <span>{booking.duration}</span> <br />
                  Avec hébergement:{' '}
                  <span>
                    {booking.hotel && <span>Oui</span>}{' '}
                    {!booking.hotel && <span>Non</span>}
                  </span>{' '}
                  <br />
                  Pour un total de : <span>{booking.total}</span>
                </div>
                <div className="profil__list-container__item__buttons-container">
                  {calculExpirationDate(booking)}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
