import './AdminAttraction.scss';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { showAdminAttractionModal } from '../../../store/modalSlice';
import { changeInputValue } from '../../../store/attractionSlice';

const cloudBaseUrl = import.meta.env.VITE_REACT_CLOUD_BASE_URL;

export default function AdminAttraction() {
  const dispatch = useDispatch();

  const attractionsList = useSelector(
    (state) => state.attraction.attractionsList
  );
  const categoriesList = useSelector((state) => state.category.categoriesList);
  const inputValue = useSelector((state) => state.attraction.settings);

  useEffect(() => {
    dispatch({ type: 'GET_ALL_ATTRACTIONS' });
    dispatch({ type: 'GET_ALL_CATEGORIES' });
  }, []);

  return (
    <div className="admin-attraction">
      <h2>Attractions</h2>
      <div className="admin-attraction__null-message">
        {attractionsList.length === 0 && <h3>Aucune Attraction</h3>}
      </div>
      <div className="admin-attraction__list-container">
        {attractionsList &&
          attractionsList.map((attraction) => (
            <div
              key={attraction.id}
              className="admin-attraction__list-container__item"
            >
              <div className="admin-attraction__list-container__item__left-container">
                <div className="admin-attraction__list-container__item__left-container__name">
                  {attraction.name}
                </div>
                <div className="admin-attraction__list-container__item__left-container__description">
                  {attraction.description}
                </div>
                <div className="admin-attraction__list-container__item__left-container__category">
                  <span>Catégorie: </span>
                  {attraction.category.name}
                </div>
                <div className="admin-attraction__list-container__item__left-container__tag">
                  <span>Tags: </span>
                  {attraction.tags.map((tag) => (
                    <div
                      key={tag.id}
                      className="admin-attraction__list-container__item__left-container__tag__tag"
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="admin-attraction__list-container__item__right-container">
                <div className="admin-attraction__list-container__item__right-container__pictures">
                  {attraction.pictures.map((picture) => (
                    <img
                      key={picture.id}
                      src={`${cloudBaseUrl}${picture.pictures_url}`}
                    />
                  ))}
                </div>
                <div className="admin-attraction__list-container__item__right-container__buttons">
                  <button
                    className=""
                    value={attraction.id}
                    onClick={(e) => {
                      dispatch({
                        type: 'GET_ONE_ATTRACTION',
                        payload: e.target.value,
                      });
                      dispatch(showAdminAttractionModal());
                    }}
                  >
                    Modifier
                  </button>
                  <button
                    className=""
                    value={attraction.id}
                    onClick={(e) => {
                      dispatch({ type: 'DELETE_ATTRACTION', payload: e.target.value});
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="admin-attraction__add-attraction">
        <h3>Ajouter un attraction</h3>

        <form className="admin-attraction__add-attraction__form"
        onSubmit={(e) => {
            e.preventDefault();
            dispatch({ type: 'POST_NEW_ATTRACTION_TO_API' });
          }}>
          <div className="admin-attraction__add-attraction__form__name">
            <h3>Nom</h3>
            <input
              type="text"
              value={inputValue.name}
              onChange={(e) => {
                dispatch(changeInputValue({ name: e.target.value }));
              }}
            />
          </div>
          <div className="admin-attraction__add-attraction__form__description">
            <h3>Description</h3>
            <textarea
              type="text"
              value={inputValue.description}
              onChange={(e) => {
                dispatch(changeInputValue({ description: e.target.value }));
              }}
            ></textarea>
          </div>
          <div className="admin-attraction__add-attraction__form__category">
            <h3>Category</h3>
            <select
              value={inputValue.category_id}
              onChange={(e) => {
                dispatch(changeInputValue({ category_id: e.target.value }));
              }}
            >
            <option>
              ---
            </option>
              {categoriesList.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className='admin-attraction__add-attraction__form__message'>
            {inputValue.message}
          </div>
          <button type='submit' className='admin-attraction__add-attraction__form__submit-button btn'>
                Créer
          </button>
        </form>
      </div>
    </div>
  );
}
