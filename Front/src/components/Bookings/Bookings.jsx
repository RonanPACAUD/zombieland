import './Bookings.scss';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import dayjs from 'dayjs';
import 'dayjs/locale/fr';

import { changeInputValue } from '../../store/bookingSlice';

const cloudBaseUrl = import.meta.env.VITE_REACT_CLOUD_BASE_URL;

dayjs.locale('fr');

export default function Bookings() {
  const dispatch = useDispatch();

  const priceList = useSelector((state) => state.price.priceList);

  const inputValue = useSelector((state) => state.booking.settings);

  const connectedUser = useSelector((state) => state.user.connected);

  // console.log(inputValue);

  useEffect(() => {
    calculTotal();
    dispatch({ type: 'GET_PRICES_FROM_API' });
  }, []);

  useEffect(() => {
    calculTotal();
  }, [inputValue.durationValue, inputValue.hotelValue, inputValue.ticketValue, inputValue.startDateValue]);

  function calculTotal() {
    priceList.forEach((price) => {
      if (
        inputValue.hotelValue === price.hotel &&
        parseInt(inputValue.durationValue) === price.duration
        ) {
        console.log(inputValue.durationValue) 
        const total = price.price * inputValue.ticketValue;
        dispatch(changeInputValue({ totalValue: total }));
      }
    });
  }

  return (
    <div className="bookings">
      <img
        src={`${cloudBaseUrl}Firefly_salle_de_restaurant_sombre_brouillard_brumeux_familial_peur_lowkey_47898.jpg`}
        alt="Zombie"
        className="bookings__picture main-picture"
      />
      <div className="bookings__main-title main-title">
        <h1>Réservez maintenant</h1>
        <img
          src={`${cloudBaseUrl}dual-underline.png`}
          alt="underline"
          className="bookings__main-title__underline underline"
        />
        <p>
          Réservez dès maintenant pour une escapade hors du commun où le danger
          et l'excitation vous attendent à chaque tournant.
        </p>
      </div>
      <div className="bookings__book">
        <h2>Réservation</h2>

        {!connectedUser && (
          <h3>
            Vous devez être connecté pour accéder au formulaire de réservation
          </h3>
        )}

        <form
          className="bookings__book__form"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({
              type: 'POST_NEW_BOOKING_TO_API',
              payload: connectedUser.id,
            });
          }}
        >
          {!connectedUser && (
            <div className="inactive-form-state"></div>
          )}

          <div className="bookings__book__form-container">
            <div className="bookings__book__form__left">
              <h3>Date d'arrivée</h3>
              <Calendar
                className="bookings__book__form__calendar"
                minDate={new Date()}
                value={inputValue.startDateValue}
                onChange={(e) => {
                  dispatch(
                    changeInputValue({
                      startDateValue: dayjs(e).format('YYYY-MM-DD'),
                    })
                  );
                }}
              />
            </div>
            <div className="bookings__book__form__right">
              <div className="bookings__book__form__duration">
                <h3>Durée du sejour</h3>
                <select
                  name="select-duration"
                  id="select-duration"
                  value={inputValue.durationValue}
                  onChange={(e) => {
                    dispatch(
                      changeInputValue({
                        durationValue: parseInt(e.target.value),
                      })
                    );
                  }}
                >
                  <option value="1">1 jour</option>
                  <option value="2">2 jours</option>
                  <option value="3">3 jours</option>
                  <option value="4">4 jours</option>
                </select>
              </div>
              <div className="bookings__book__form__hotel">
                <h3>Hébergement</h3>
                <fieldset className="bookings__book__form__hotel__fieldset">
                  <div className="select-with-hotel">
                    <input
                      type="radio"
                      name="select-hotel"
                      id="select-with-hotel"
                      checked={!inputValue.hotelValue}
                      onChange={() => {
                        dispatch(changeInputValue({ hotelValue: false }));
                      }}
                    />
                    <label htmlFor="without-hotel">Sans Hébergement</label>
                  </div>
                  <div className="select-with-hotel">
                    <input
                      type="radio"
                      name="select-hotel"
                      checked={inputValue.hotelValue}
                      onChange={() => {
                        dispatch(changeInputValue({ hotelValue: true }));
                      }}
                    />
                    <label htmlFor="with-hotel">Avec Hébergement</label>
                  </div>
                </fieldset>
              </div>
              <div className="bookings__book__form__ticket">
                <h3>Billets</h3>
                <div>Nombre de billets :</div>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={inputValue.ticketValue}
                  className="bookings__book__form__ticket__input-ticket"
                  onChange={(e) => {
                    dispatch(
                      changeInputValue({
                        ticketValue: parseInt(e.target.value),
                      })
                    );
                    calculTotal();
                  }}
                />
                personne
              </div>
            </div>
          </div>
          <div className="bookings__book__form__message">
            {inputValue.message}
          </div>
          <div className="bookings__book__form__total-submit">
            <div className="bookings__book__form__total-submit__total">
              Total: {inputValue.totalValue} €
            </div>
            <button type="submit" className="booking-form-submit-button btn">
              Réserver
            </button>
          </div>
        </form>
      </div>
      <div className="bookings__practical-info">
        <h2>Infos Pratiques</h2>
        <div className="bookings__practical-info__info-container">
          <div className="bookings__practical-info__info-container__opening">
            <h3>Horaires d'ouverture</h3>
            Le parc est ouvert tous les jours, du lundi au dimanche, de 9h à 18h
          </div>
          <div className="bookings__practical-info__info-container__rate">
            <h3>Tarifs</h3>
            <div className="bookings__practical-info__info-container__rate__rate-container">
              <div className="bookings__practical-info__info-container__rate__without-hotel">
                {priceList.map((price) => {
                  if (!price.hotel) {
                    return (
                      <div key={price.id}>
                        Pass {price.duration} journée : {price.price} €<br />
                      </div>
                    );
                  }
                })}
              </div>
              <div className="whith-hotel">
                Avec hotel le prix est de :<br />
                {priceList.map((price) => {
                  if (price.hotel) {
                    return (
                      <div key={price.id}>
                        {price.duration} jours et {price.duration - 1} nuit :{' '}
                        {price.price} €<br />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
          <div className="bookings__practical-info__info-container__location">
            <h3>Emplacement</h3>
            ZombieLand Amusement Park
            <br />
            3 Chemin de la tombe
            <br />
            77 118 La Tombe <br />
            Seine-et Marne
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
