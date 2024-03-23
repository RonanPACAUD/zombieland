import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  settings: {
    name: '',
  },
  categoriesList: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    changeCategoryNameValue: (state, action) => {
      return {
        ...state,
        settings: {
          ...state.settings,
          name: action.payload,
        },
      };
    },

    updateCategoryList: (state, action) => {
      return {
        ...state,
        categoriesList: action.payload,
      };
    },

    resetCategoryState: (state) => {
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

export const { updateCategoryList, changeCategoryNameValue, resetCategoryState } = categorySlice.actions;

export default categorySlice.reducer;
