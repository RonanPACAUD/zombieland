import './AdminAttractionModal.scss';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import closed from '../../../assets/icon/close.png';

export default function AdminAttractionModal() {
  const dispatch = useDispatch();

  const selectedAttractionValue = useSelector(
    (state) => state.attraction.selected
  );
  useEffect(() => {
    dispatch({ type: 'GET_ALL_CATEGORIES' });
    dispatch({ type: 'GET_ALL_TAGS' });
  }, []);

  const categoriesList = useSelector((state) => state.category.categoriesList);
  const tagsList = useSelector((state) => state.tag.tagsList);

  return (
    <div className="admin-attraction-modal">
      <h2>Modifier Attraction</h2>
      <div className="admin-attraction-modal__main-container">
        <form className="admin-attraction-modal__form">
          <div className="admin-attraction-modal__form__name">
            <h3>Nom</h3>
            <input
              type="text"
              value={selectedAttractionValue.name}
              onChange={(e) => {
                dispatch({
                  type: 'MODIFY_ATTRACTION_TO_API',
                  payload: {
                    id: selectedAttractionValue.attraction_id,
                    name: e.target.value,
                  },
                });
              }}
            />
          </div>
          <div className="admin-attraction-modal__form__description">
            <h3>Description</h3>
            <textarea
              type="text"
              value={selectedAttractionValue.description}
              onChange={(e) => {
                dispatch({
                  type: 'MODIFY_ATTRACTION_TO_API',
                  payload: {
                    id: selectedAttractionValue.attraction_id,
                    description: e.target.value,
                  },
                });
              }}
            ></textarea>
          </div>
          <div className="admin-attraction-modal__form__category">
            <h3>Category</h3>
            <select
              value={selectedAttractionValue.category_id}
              onChange={(e) => {
                dispatch({
                  type: 'MODIFY_ATTRACTION_TO_API',
                  payload: {
                    id: selectedAttractionValue.attraction_id,
                    category_id: e.target.value,
                  },
                });
              }}
            >
              {categoriesList.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </form>
        <div className="admin-attraction-modal__form__tag">
          <h3>Tags</h3>
          <div className="admin-attraction-modal__form__tag__tag-list">
            {selectedAttractionValue.tags &&
              selectedAttractionValue.tags.map((tag) => (
                <div
                  key={tag.id}
                  className="admin-attraction-modal__form__tag__tag-list__item"
                >
                  {tag.name}
                  <button
                    onClick={(e) => {
                      dispatch({
                        type: 'DELETE_TAG_FROM_ATTRACTION',
                        payload: {
                          attraction_id: selectedAttractionValue.attraction_id,
                          tag_id: tag.id,
                        },
                      });
                    }}
                  >
                    <img src={closed} alt="Closed" />
                  </button>
                </div>
              ))}
          </div>
          <div className="admin-attraction-modal__form__tag__add-tag">
            <div className="admin-attraction-modal__form__tag__add-tag__label">
              Ajouter un tag
            </div>
            <select
              value={selectedAttractionValue.tag_id}
              onChange={(e) => {
                dispatch({
                  type: 'ADD_TAG_TO_ATTRACTION',
                  payload: {
                    attraction_id: selectedAttractionValue.attraction_id,
                    tag_id: e.target.value,
                  },
                });
              }}
            >
              {tagsList.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="admin-attraction-modal__form__pictures">
            <h3>Photo</h3>
            <div className="admin-attraction-modal__form__pictures__list-container">
              {selectedAttractionValue.pictures && selectedAttractionValue.pictures.map((picture) => (
                <div
                  key={picture.id}
                  className="admin-attraction-modal__form__pictures__list-container__item"
                >
                  <img src={`http://localhost:3000/${picture.pictures_url}`} />
                  <button
                    className="admin-attraction-modal__form__pictures__list-container__item__close-button"
                    onClick={() => {
                      dispatch({
                        type: 'DELETE_PICTURE',
                        payload: {picture_id: picture.id, attraction_id: selectedAttractionValue.attraction_id},
                      });
                    }}
                  >
                    <img src={closed} />
                  </button>
                </div>
              ))}
            </div>
            <form
              method="POST"
              encType="multipart/form-data"
              onSubmit={(e) => {
                e.preventDefault();
                console.log(e.target.value);
              }}
            >
              <input
                type="file"
                className="admin-attraction-modal__form__pictures__add-picture-button"
                name="photo"
                placeholder="Ajouter une photo"
                accept="image/*"
                onChange={(e) => {
                  dispatch({
                    type: 'UPLOAD_PICTURE_TO_MULTER',
                    payload: e.target.files[0],
                  });
                  dispatch({
                    type: 'UPLOAD_PICTURE_TO_API',
                    payload: {
                      id: selectedAttractionValue.attraction_id,
                      name: e.target.files[0].name,
                    },
                  });
                  dispatch({
                    type: 'GET_ONE_ATTRACTION',
                    payload: selectedAttractionValue.attraction_id,
                  });
                }}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
