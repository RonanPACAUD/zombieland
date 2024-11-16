import './Header.scss';

import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { toogleBurgerMenu, toogleMainModal } from '../../store/modalSlice';
import { useSelector } from 'react-redux';
import { resetConnectedUser } from '../../store/userSlice';
import { Link } from 'react-router-dom';
import Media from 'react-media';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const connectedUser = useSelector((state) => state.user.connected);
  const burgerMenuIsOpen = useSelector((state) => state.modal.burgerMenuIsOpen);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__container__logo-container">
          <Link to="/" className="inactive">
            <img src={'https://res.cloudinary.com/dqi53fnvz/image/upload/v1731763118/ZombieLand_l5t03q.png'} alt="Logo" className="header__container__logo-container__logo" />
          </Link>
        </div>
        <Media query={{ minWidth: 1021 }}>
          <nav className="header__container__nav-link">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : 'inactive')}
            >
              Accueil
            </NavLink>
            <NavLink to="/attractions">Attractions</NavLink>
            <NavLink to="/bookings">Réservations</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            {connectedUser && <NavLink to="/profil">Profil</NavLink>}
            {(connectedUser && connectedUser.role) === 'admin' && (
              <NavLink to="/admin">Admin</NavLink>
            )}

            {!connectedUser && (
              <button
                className="header__container__nav-link__connexion-button"
                onClick={() => {
                  dispatch(toogleMainModal());
                }}
              >
                Connexion/Inscritpion
              </button>
            )}
            {connectedUser && (
              <button
                className="header__container__nav-link__connexion-button"
                onClick={() => {
                  dispatch(resetConnectedUser());
                  navigate('/');
                }}
              >
                Déconnexion
              </button>
            )}
          </nav>
        </Media>
        <Media query={{ maxWidth: 1020 }}>
          <div className="header__container__burger-menu">
            <button
              className="header__container__burger-menu__button"
              onClick={() => {
                dispatch(toogleBurgerMenu());
              }}
            >
              <img
                src={'https://storage.googleapis.com/zombieland-assets/menu.png'}
                alt="Burger Menu"
                className="header__container__burger-menu__button__burger-icon"
              />
            </button>
            {burgerMenuIsOpen && <BurgerMenu />}
          </div>
        </Media>
      </div>
    </header>
  );
}
