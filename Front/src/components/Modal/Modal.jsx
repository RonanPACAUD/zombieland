import Connexion from '../Connexion/Connexion';
import './Modal.scss';

import { toogleMainModal } from '../../store/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import Inscription from '../Inscription/Inscription';
import AdminBookingModal from '../AdminComponents/AdminBookingModal/AdminBookingModal';
import AdminAttractionModal from '../AdminComponents/AdminAttractionModal/AdminAttractionModal';
import AdminUserModal from '../AdminComponents/AdminUserModal/AdminUserModal';
import ProfileModal from '../ProfileModal/ProfileModal';
import ResetPassword from '../ResetPassword/ResetPassword';

export default function Modal() {
  const dispatch = useDispatch();

  const connexionModalIsOpen = useSelector(
    (state) => state.modal.connexionModalIsOpen
  );
  const inscriptionModalIsOpen = useSelector(
    (state) => state.modal.inscriptionModalIsOpen
  );
  const adminBookingModal = useSelector(
    (state) => state.modal.adminBookingModal
  );
  const adminAttractionModal = useSelector(
    (state) => state.modal.adminAttractionModal
  );
  const adminUserModal = useSelector(
    (state) => state.modal.adminUserModal
  );
  const modifyProfilModal = useSelector((state) => state.modal.modifyProfilModal);

  const resetPasswordModal = useSelector((state) => state.modal.resetPasswordModal);

  return (
    <div
      className="modal"
      onClick={() => {
        dispatch(toogleMainModal());
      }}
    >
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal__container__close-button"
          onClick={() => {
            dispatch(toogleMainModal());
          }}
        >
          <img src={'https://storage.googleapis.com/zombieland-assets/close.png'} alt="Close button" />
        </button>
        {connexionModalIsOpen && <Connexion />}
        {inscriptionModalIsOpen && <Inscription />}
        {adminBookingModal && <AdminBookingModal />}
        {adminAttractionModal && <AdminAttractionModal />}
        {adminUserModal && <AdminUserModal />}
        {modifyProfilModal && <ProfileModal />}
        {resetPasswordModal && <ResetPassword />}
      </div>
    </div>
  );
}
