import './AdminBooking.scss';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { showAdminBookingModal } from '../../../store/modalSlice';

export default function AdminBookings() {
  const dispatch = useDispatch();

  const bookingsList = useSelector((state) => state.booking.bookingsList);

  useEffect(() => {
    dispatch({ type: 'GET_ALL_BOOKINGS' });
  }, []);

  return (
    <div className="admin-booking">
      <h2>Réservation</h2>
      <div className="admin-booking__null-message">
        {bookingsList.length === 0 && <h3>Aucune réservation</h3>}
      </div>
      <div className="admin-booking__list-container">
        {bookingsList &&
          bookingsList.map((booking) => (
            <div
              key={booking.id}
              className='admin-booking__list-container__item'
            >
              {booking.closed && <div className='admin-booking__list-container__item__after'></div>}
              <div className="admin-booking__list-container__item__user">
                {booking.author.first_name} {booking.author.last_name} <br />
                {booking.author.email} <br />
                {booking.author.address} <br />
                {booking.author.city} <br />
                {booking.author.country}
              </div>
              <div className="admin-booking__list-container__item__booking">
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
              <div className="admin-booking__list-container__item__buttons">
                <button
                  className="admin-booking__list-container__item__buttons__classified"
                  value={booking.id}
                  onClick={(e) => {
                    dispatch({
                      type: 'MODIFY_BOOKING_TO_API',
                      payload: {
                        id: e.target.value,
                        closed: !booking.closed,
                      },
                    })
                  }}
                >
                  Classer
                </button>
                <button
                  className=""
                  value={booking.id}
                  onClick={(e) => {
                    dispatch({
                      type: 'GET_ONE_BOOKING',
                      payload: e.target.value,
                    });
                    dispatch(showAdminBookingModal());
                  }}
                >
                  Modifier
                </button>
                <button
                  className=""
                  value={booking.id}
                  onClick={(e) => {
                    dispatch({
                      type: 'DELETE_BOOKING',
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
    </div>
  );
}
