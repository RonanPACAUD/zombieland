import './App.scss';

import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Footer from '../Footer/Footer';
import Greeting from '../Greeting/Greeting';
import Header from '../Header/Header';
import Attractions from '../Attractions/Attractions';
import Bookings from '../Bookings/Bookings';
import Admin from '../AdminComponents/Admin/Admin';
import Contact from '../Contact/Contact';
import Modal from '../Modal/Modal';

import AdminBookings from '../AdminComponents/AdminBooking/AdminBooking';
import AdminMessage from '../AdminComponents/AdminMessage/AdminMessage';
import AdminAttraction from '../AdminComponents/AdminAttraction/AdminAttraction';
import AdminTagCategory from '../AdminComponents/AdminTagCategory/AdminTagCategory';
import AdminPrice from '../AdminComponents/AdminPrice/AdminPrice';
import AdminUser from '../AdminComponents/AdminUser/AdminUser';
import Profil from '../Profil/Profil';
import NotFound from '../NotFound/NotFound';

import { updateConnectedUser } from '../../store/userSlice';

function App() {
  const dispatch = useDispatch();

  const mainModalIsOpen = useSelector((state) => state.modal.mainModalIsOpen);

  const localUser = JSON.parse(localStorage.getItem('connectedUser'));

  const currentPage = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    if (localUser) {
      dispatch(updateConnectedUser(localUser));
    }
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="app">
      <Header />
      {mainModalIsOpen && <Modal />}

      <Routes>
        <Route path="/" element={<Greeting />} />
        <Route path="/attractions" element={<Attractions />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/admin" element={<Admin />}>
          <Route index element={<AdminBookings />} />
          <Route path="/admin/admin-booking" element={<AdminBookings />} />
          <Route path="/admin/admin-message" element={<AdminMessage />} />
          <Route path="/admin/admin-attraction" element={<AdminAttraction />} />
          <Route path="/admin/admin-user" element={<AdminUser />} />
          <Route
            path="/admin/admin-tag-category"
            element={<AdminTagCategory />}
          />
          <Route path="/admin/admin-price" element={<AdminPrice />} />
        </Route>
        <Route path="*" element={<NotFound />}/>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
