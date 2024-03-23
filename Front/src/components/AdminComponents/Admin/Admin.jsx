import './Admin.scss';

import { Link, Outlet } from 'react-router-dom';

export default function Admin() {
  return (
    <div className="admin-greetings">
      <h1>Espace Admin</h1>
      <div className="admin-greetings__nav-link">
        <Link to="admin-booking" className="inactive">Réservations</Link>
        <Link to="admin-message">Messages</Link>
        <Link to="admin-attraction">Attractions</Link>
        <Link to="admin-user">Utilisateurs</Link>
        <Link to="admin-tag-category">Tags/Catégories</Link>
        <Link to="admin-price">Prix</Link>
      </div>
      <Outlet /> 
    </div>
  );
}
