import './Footer.scss';

import logo from '../../assets/logo/ZombieLand.png';
import facebook from '../../assets/icon/facebook.png'
import twitter from '../../assets/icon/twitter.png'
import instagram from '../../assets/icon/instagram.png'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <img src={logo} alt="Logo" className="footer__container__logo" />
        <div className='footer__container__social-network-container'>
          <img src={facebook} alt="facebook"/>
          <img src={twitter} alt="twitter"/>
          <img src={instagram} alt="instagram"/>
        </div>
      </div>
    </footer>
  );
}
