import './Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <img src={'https://res.cloudinary.com/dqi53fnvz/image/upload/v1731763127/ZombieLand.png'} alt="Logo" className="footer__container__logo" />
        <div className='footer__container__social-network-container'>
          <img src={'https://res.cloudinary.com/dqi53fnvz/image/upload/v1731763127/facebook.png'} alt="facebook"/>
          <img src={'https://res.cloudinary.com/dqi53fnvz/image/upload/v1731763127/twitter.png'} alt="twitter"/>
          <img src={'https://res.cloudinary.com/dqi53fnvz/image/upload/v1731763127/instagram.png'} alt="instagram"/>
        </div>
      </div>
    </footer>
  );
}
