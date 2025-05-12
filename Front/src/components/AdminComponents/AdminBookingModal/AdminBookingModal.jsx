import './AdminBookingModal.scss';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import dayjs from 'dayjs';
import 'dayjs/locale/fr';

import { changeInputValue } from '../../../store/bookingSlice';

dayjs.locale('fr');

export default function AdminBookingModal() {
  const dispatch = useDispatch();

  const priceList = useSelector((state) => state.price.priceList);
  const inputValue = useSelector((state) => state.booking.settings);
  const selectedBookingValues = useSelector((state) => state.booking.selected);

  useEffect(() => {
    calculTotal();
  }, [
    selectedBookingValues.durationValue,
    selectedBookingValues.hotelValue,
    selectedBookingValues.ticketValue,
    selectedBookingValues.startDateValue
  ]);

  function calculTotal() {
    priceList.forEach((price) => {
      if (
        selectedBookingValues.hotelValue === price.hotel &&
        parseInt(selectedBookingValues.durationValue) === price.duration
      ) {
        const total = price.price * selectedBookingValues.ticketValue;
        dispatch(changeInputValue({ totalValue: total }));
      }
    });
  }

  return (
    <div className="admin-booking-modal">
      <h2>Modifier Réservation</h2>
      <form className="admin-booking-modal__book__form">
        <div className="admin-booking-modal__book__form-container">
          <div className="admin-booking-modal__book__form__left">
            <h3>Date d'arrivée</h3>
            <Calendar
              className="admin-booking-modal__book__form__calendar"
              minDate={new Date()}
              value={selectedBookingValues.startDateValue}
              onChange={(e) => {
                dispatch({
                  type: 'MODIFY_BOOKING_TO_API',
                  payload: {
                    id: selectedBookingValues.booking_id,
                    start_date: dayjs(e).format('YYYY-MM-DD'),
                  },
                });
              }}
            />
          </div>
          <div className="admin-booking-modal__book__form__right">
            <div className="admin-booking-modal__book__form__duration">
              <h3>Durée du sejour</h3>
              <select
                name="select-duration"
                id="select-duration"
                value={selectedBookingValues.durationValue}
                onChange={(e) => {
                  dispatch({
                    type: 'MODIFY_BOOKING_TO_API',
                    payload: {
                      id: selectedBookingValues.booking_id,
                      duration: e.target.value,
                    },
                  });
                }}
              >
                <option value="1">1 jour</option>
                <option value="2">2 jours</option>
                <option value="3">3 jours</option>
                <option value="4">4 jours</option>
              </select>
            </div>
            <div className="admin-booking-modal__book__form__hotel">
              <h3>Hébergement</h3>
              <fieldset>
                <div className="select-with-hotel">
                  <input
                    type="radio"
                    name="select-hotel"
                    id="select-with-hotel"
                    checked={!selectedBookingValues.hotelValue}
                    onChange={() => {
                      dispatch({
                        type: 'MODIFY_BOOKING_TO_API',
                        payload: {
                          id: selectedBookingValues.booking_id,
                          hotelValue: 'false',
                        },
                      });
                    }}
                  />
                  <label htmlFor="without-hotel">Sans Hébergement</label>
                </div>
                <div className="select-with-hotel">
                  <input
                    type="radio"
                    name="select-hotel"
                    checked={selectedBookingValues.hotelValue}
                    onChange={() => {
                      dispatch({
                        type: 'MODIFY_BOOKING_TO_API',
                        payload: {
                          id: selectedBookingValues.booking_id,
                          hotelValue: 'true',
                        },
                      });
                    }}
                  />
                  <label htmlFor="with-hotel">Avec Hébergement</label>
                </div>
              </fieldset>
            </div>
            <div className="admin-booking-modal__book__form__ticket">
              <h3>Billets</h3>
              <div>Nombre de billets :</div>
              <input
                type="number"
                min="1"
                max="50"
                value={selectedBookingValues.ticketValue}
                className="input-ticket"
                onChange={(e) => {
                  dispatch({
                    type: 'MODIFY_BOOKING_TO_API',
                    payload: {
                      id: selectedBookingValues.booking_id,
                      nb_people: e.target.value,
                    },
                  });
                }}
              />
              personne
            </div>
          </div>
        </div>
        {/* <div className="admin-booking__book__form__message">{bookingMessage}</div> */}
        <div className="admin-booking-modal__book__form__total-submit">
          <div className="admin-booking-modal__book__form__total-submit__total">
            Total: {inputValue.totalValue} €
          </div>
        </div>
      </form>
    </div>
  );
}
