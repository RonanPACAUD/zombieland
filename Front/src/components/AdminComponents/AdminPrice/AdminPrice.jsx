import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import './AdminPrice.scss';
import {
  changeDurationlValue,
  changeHotelValue,
  changePricelValue,
} from '../../../store/priceSlice';
import { useEffect } from 'react';

export default function AdminPrice() {
  const dispatch = useDispatch();

  const hotelValue = useSelector((state) => state.price.settings.hotel);
  const durationValue = useSelector((state) => state.price.settings.duration);
  const priceValue = useSelector((state) => state.price.settings.price);

  const priceList = useSelector((state) => state.price.priceList);

  useEffect(() => {
    dispatch({ type: 'GET_PRICES_FROM_API'})
  }, [])

  return (
    <div className="admin-price">
      <h2>Prix</h2>
      <div className="admin-price__container">
        <div className="admin-price__item">
          <div>Hotel</div>
          <div>Durée</div>
          <div>Prix</div>
          <div className="admin-price__item__fictive"></div>
        </div>
        {priceList.map((price) => (
          <div key={price.id} className="admin-price__item">
            <div>
              {price.hotel && <span>Avec</span>}
              {!price.hotel && <span>Sans</span>}
            </div>
            <div>{price.duration}</div>
            <div>{price.price}</div>
            <button
              className="admin-price__item__delete-button"
              value={price.id}
              onClick={(e) => {
                dispatch({
                  type: 'DELETE_PRICE',
                  payload: e.target.value,
                });
              }}
            >
              Supprimer
            </button>
          </div>
        ))}
        <h3>Ajouter un Prix</h3>
        <div className="admin-price__item">
          <div>Hotel</div>
          <div>Durée</div>
          <div>Prix</div>
          <div className="admin-price__item__fictive"></div>
        </div>
        <form
          className="admin-price__add"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({ type: 'POST_NEW_PRICE_TO_API' });
          }}
        >
          <select
            value={hotelValue}
            onChange={(e) => {
              dispatch(changeHotelValue(e.target.value));
            }}
          >
            <option value={false}>
              Sans Hotel
            </option>
            <option value={true}>Avec Hotel</option>
          </select>
          <input
            type="number"
            min="0"
            value={durationValue}
            onChange={(e) => {
              dispatch(changeDurationlValue(e.target.value));
            }}
          />
          <input
            type="number"
            min="0"
            value={priceValue}
            onChange={(e) => {
              dispatch(changePricelValue(e.target.value));
            }}
          />
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </div>
  );
}
