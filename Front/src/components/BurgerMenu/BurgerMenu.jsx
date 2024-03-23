import { useSelector } from 'react-redux';
import './BurgerMenu.scss';
import { NavLink } from 'react-router-dom';
import { toogleBurgerMenu, toogleMainModal } from '../../store/modalSlice';
import { useDispatch } from 'react-redux';
import { resetConnectedUser } from '../../store/userSlice';

export default function BurgerMenu() {
  const dispatch = useDispatch();


  const connectedUser = useSelector((state) => state.user.connected);

  return (
    <div className="burger-menu">
    
      <nav className="burger-menu__container__nav-link">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active' : 'inactive')}
          onClick={() => {
            dispatch(toogleBurgerMenu())
          }}
        >
          Accueil
        </NavLink>
        <NavLink to="/attractions"
        onClick={() => {
            dispatch(toogleBurgerMenu())
          }}>Attractions</NavLink>
        <NavLink to="/bookings"
        onClick={() => {
            dispatch(toogleBurgerMenu())
          }}>Réservations</NavLink>
        <NavLink to="/contact"
        onClick={() => {
            dispatch(toogleBurgerMenu())
          }}>Contact</NavLink>
        {connectedUser.connected && <NavLink to="/profil"
        onClick={() => {
            dispatch(toogleBurgerMenu())
          }}>Profil</NavLink>}
        {connectedUser.role === 'admin' && <NavLink to="/admin"
        onClick={() => {
            dispatch(toogleBurgerMenu())
          }}>Admin</NavLink>}

        {!connectedUser.connected && (
          <button
            className="burger-menu__container__nav-link__connexion-button"
            onClick={() => {
              dispatch(toogleMainModal());
              dispatch(toogleBurgerMenu());
            }}
          >
            Connexion<br/>
            /Inscritpion
          </button>
        )}
        {connectedUser.connected && (
          <button
            className="burger-menu__container__nav-link__connexion-button"
            onClick={() => {
              dispatch(toogleBurgerMenu());
              dispatch(resetConnectedUser());
              navigate('/');
            }}
          >
            Déconnexion
          </button>
        )}
      </nav>
    </div>
  );
}
