import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  settings: {
    name: '',
  },
  tagsList: [],
};

const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    changeTagNameValue: (state, action) => {
      return {
        ...state,
        settings: {
          ...state.settings,
          name: action.payload,
        },
      };
    },

    updatetagsList: (state, action) => {
      return {
        ...state,
        tagsList: action.payload,
      };
    },

    resetTagState: (state) => {
        return {
            ...state,
            settings: {
                ...state.settings,
                name: '',
            }
        }
    },
  },
});

export const { updatetagsList, changeTagNameValue, resetTagState } = tagSlice.actions;

export default tagSlice.reducer;
