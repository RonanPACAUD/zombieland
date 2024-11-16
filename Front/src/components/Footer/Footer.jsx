import './Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <img src={'https://storage.googleapis.com/zombieland-assets/ZombieLand.png'} alt="Logo" className="footer__container__logo" />
        <div className='footer__container__social-network-container'>
          <img src={'https://storage.googleapis.com/zombieland-assets/facebook.png'} alt="facebook"/>
          <img src={'https://storage.googleapis.com/zombieland-assets/twitter.png'} alt="twitter"/>
          <img src={'https://storage.googleapis.com/zombieland-assets/instagram.png'} alt="instagram"/>
        </div>
      </div>
    </footer>
  );
}
