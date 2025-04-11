import './NotFound.scss';

const cloudBaseUrl = import.meta.env.VITE_REACT_CLOUD_BASE_URL;

export default function NotFound() {
  return (
    <div className="not-found">
      <img
        src={`${cloudBaseUrl}zombie-parade-2.png`}
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
