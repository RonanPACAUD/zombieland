import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mainModalIsOpen: false,
  connexionModalIsOpen: true,
  inscriptionModalIsOpen: false,
  adminBookingModal: false,
  adminAttractionModal: false,
  adminUserModal: false,
  modifyProfilModal: false,
  resetPasswordModal: false,
  burgerMenuIsOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toogleMainModal: (state) => {
      return {
        ...state,
        mainModalIsOpen: !state.mainModalIsOpen,
        connexionModalIsOpen: true,
        inscriptionModalIsOpen: false,
        adminBookingModal: false,
        adminAttractionModal: false,
        adminUserModal: false,
        modifyProfilModal: false,
        resetPasswordModal: false,
      };
    },

    showInscriptionModal: (state) => {
      return {
        ...state,
        connexionModalIsOpen: false,
        inscriptionModalIsOpen: true,
        adminBookingModal: false,
        adminAttractionModal: false,
        adminUserModal: false,
        modifyProfilModal: false,
        resetPasswordModal: false,
      };
    },

    showAdminBookingModal: (state) => {
      return {
        ...state,
        mainModalIsOpen: !state.mainModalIsOpen,
        connexionModalIsOpen: false,
        inscriptionModalIsOpen: false,
        adminBookingModal: true,
        adminAttractionModal: false,
        adminUserModal: false,
        modifyProfilModal: false,
        resetPasswordModal: false,
      };
    },

    showAdminAttractionModal: (state) => {
      return {
        ...state,
        mainModalIsOpen: !state.mainModalIsOpen,
        connexionModalIsOpen: false,
        inscriptionModalIsOpen: false,
        adminBookingModal: false,
        adminAttractionModal: true,
        adminUserModal: false,
        modifyProfilModal: false,
        resetPasswordModal: false,
      };
    },

    showAdminUserModal: (state) => {
      return {
        ...state,
        mainModalIsOpen: !state.mainModalIsOpen,
        connexionModalIsOpen: false,
        inscriptionModalIsOpen: false,
        adminBookingModal: false,
        adminAttractionModal: false,
        adminUserModal: true,
        modifyProfilModal: false,
        resetPasswordModal: false,
      };
    },

    showModifyProfilModal: (state) => {
      return {
        ...state,
        mainModalIsOpen: !state.mainModalIsOpen,
        connexionModalIsOpen: false,
        inscriptionModalIsOpen: false,
        adminBookingModal: false,
        adminAttractionModal: false,
        adminUserModal: false,
        modifyProfilModal: true,
        resetPasswordModal: false,
      };
    },

    showResetPasswordModal: (state) => {
      return {
        ...state,
        mainModalIsOpen: !state.mainModalIsOpen,
        connexionModalIsOpen: false,
        inscriptionModalIsOpen: false,
        adminBookingModal: false,
        adminAttractionModal: false,
        adminUserModal: false,
        modifyProfilModal: false,
        resetPasswordModal: true,
      };
    },

    toogleBurgerMenu: (state) => {
      return {
        ...state,
        burgerMenuIsOpen: !state.burgerMenuIsOpen
      }
    }
  },
});

export const {
  toogleMainModal,
  showInscriptionModal,
  showAdminBookingModal,
  showAdminAttractionModal,
  showAdminUserModal,
  showModifyProfilModal,
  showResetPasswordModal,
  toogleBurgerMenu,
} = modalSlice.actions;

export default modalSlice.reducer;
