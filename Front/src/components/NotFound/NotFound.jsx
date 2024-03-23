import './NotFound.scss';

import notFoundPicture from '../../assets/notFound-assets/zombie-parade-2.png';

export default function NotFound() {
  return (
    <div className="not-found">
      <img
        src={notFoundPicture}
        alt="Zombie"
        className="not-found__picture main-picture"
      ></img>
      <div className="not-found__main-title main-title">
        <h1>Tu es perdu ?</h1>
      </div>
      <div className="not-found__background">
        <h2>404</h2>
      </div>
    </div>
  );
}
