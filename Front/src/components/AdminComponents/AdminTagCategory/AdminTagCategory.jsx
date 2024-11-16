import { useSelector } from 'react-redux';
import './AdminTagCategory.scss';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { changeCategoryNameValue } from '../../../store/categorySlice';
import { changeTagNameValue } from '../../../store/tagSlice';

export default function AdminTagCategory() {
  const dispatch = useDispatch();

  const categoriesList = useSelector((state) => state.category.categoriesList);
  const tagsList = useSelector((state) => state.tag.tagsList);
  const categoryNameValue = useSelector(
    (state) => state.category.settings.name
  );
  const tagNameValue = useSelector((state) => state.tag.settings.name);

  useEffect(() => {
    dispatch({ type: 'GET_ALL_CATEGORIES' });
  }, []);

  useEffect(() => {
    dispatch({ type: 'GET_ALL_TAGS' });
  }, []);

  return (
    <div className="admin-tag-category">
        <h2>Catégories</h2>
      <div className="admin-tag-category__container">
        {categoriesList.map((category) => (
          <div key={category.id} className="admin-tag-category__item">
            <div className="admin-tag-category__item__name">
              {category.name}
            </div>
            <button
              className="admin-tag-category__item__delete-button"
              value={category.id}
              onClick={(e) => {
                dispatch({
                  type: 'DELETE_CATEGORY',
                  payload: e.target.value,
                });
              }}
            >
              Supprimer
            </button>
          </div>
        ))}
        <h3>Ajouter une Categorie</h3>
        <form
          className="admin-tag-category__add"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({ type: 'POST_NEW_CATEGORY_TO_API' });
          }}
        >
          <input
            type="text"
            value={categoryNameValue}
            onChange={(e) => {
              dispatch(changeCategoryNameValue(e.target.value));
            }}
          />
          <button type="submit">Ajouter</button>
        </form>
      </div>
      <div className="admin-tag-category__container">
        <h2>Tags</h2>
        {tagsList.map((tag) => (
          <div key={tag.id} className="admin-tag-category__item">
            <div className="admin-tag-category__item__name">{tag.name}</div>
            <button className="admin-tag-category__item__delete-button" value={tag.id}
              onClick={(e) => {
                dispatch({
                  type: 'DELETE_TAG',
                  payload: e.target.value,
                });
              }}>
              Supprimer
            </button>
          </div>
        ))}
        <h3>Ajouter un Tag</h3>
        <form
          className="admin-tag-category__add"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({ type: 'POST_NEW_TAG_TO_API' });
          }}
        >
          <input
            type="text"
            value={tagNameValue}
            onChange={(e) => {
              dispatch(changeTagNameValue(e.target.value));
            }}
          />
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </div>
  );
}
