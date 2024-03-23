import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  settings: {
    emailValue: '',
    passwordValue: '',
    message: '',
  },
};

const connexionSlice = createSlice({
  name: 'connexion',
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

    resetConnexionState: (state) => {
      return {
        ...state,
        settings: {
          ...state.settings,
          emailValue: '',
          passwordValue: '',
          message: '',
        },
      };
    },
  },
});

export const { changeInputValue, resetConnexionState } =
  connexionSlice.actions;

export default connexionSlice.reducer;
