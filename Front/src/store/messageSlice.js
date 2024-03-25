import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  settings: {
    subjectValue: '',
    contentValue: '',
    sender_id: 1,
    message: '',
  },
  messagesList: [],
  selected: {
    subjectValue: '',
    contentValue: '',
    sender_id: 1,
    closed: false,
    message: '',
  },
};

const messageSlice = createSlice({
  name: 'message',
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

    resetMessageState: (state) => {
      return {
        ...state,
        settings: {
          ...state.settings,
          subjectValue: '',
          contentValue: '',
          sender_id: 1,
          message: '',
        },
      };
    },

    updateMessagesList: (state, action) => {
      return {
        ...state,
        messagesList: action.payload,
      };
    },
  },
});

export const {
  changeInputValue,
  updateMessagesList,
  resetMessageState,
} = messageSlice.actions;

export default messageSlice.reducer;
