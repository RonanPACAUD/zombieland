import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  settings: {
    firstNameValue: '',
    lastNameValue: '',
    emailValue: '',
    addressValue: '',
    cityValue: '',
    countryValue: '',
    passwordValue: '',
    newPasswordValue: '',
    confirmPasswordValue: '',
    role: 'membre',
    message: '',
  },
};

const inscriptionSlice = createSlice({
  name: 'inscription',
  initialState,
  reducers: {
    changeInputValue: (state, action) => {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload,
        },
      };
    },

    resetInscriptionState: (state) => {
      return {
        ...state,
        settings: {
          ...state.settings,
          firstNameValue: '',
          lastNameValue: '',
          emailValue: '',
          addressValue: '',
          cityValue: '',
          countryValue: '',
          passwordValue: '',
          newPasswordValue: '',
          confirmPasswordValue: '',
          role: 'membre',
          message: '',
        }
      }
    }
  },
});

export const {
  changeInputValue,
  resetInscriptionState
} = inscriptionSlice.actions;

export default inscriptionSlice.reducer;
