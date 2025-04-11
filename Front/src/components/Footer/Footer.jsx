import './Footer.scss';

const cloudBaseUrl = import.meta.env.VITE_REACT_CLOUD_BASE_URL;

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <img
          src={`${cloudBaseUrl}ZombieLand.png`}
          alt="Logo"
          className="footer__container__logo"
        />
        <div className="footer__container__social-network-container">
          <img src={`${cloudBaseUrl}facebook.png`} alt="facebook" />
          <img src={`${cloudBaseUrl}twitter.png`} alt="twitter" />
          <img src={`${cloudBaseUrl}instagram.png`} alt="instagram" />
        </div>
      </div>
    </footer>
  );
}
