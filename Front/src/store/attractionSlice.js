import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  settings: {
    name: '',
    description: '',
    category_id: 0,
    message: '',
  },
  attractionsList: [],
  selected: {
    attraction_id: 0,
    name: '',
    description: '',
    category_id: 0,
    tags: [],
    pictures: [],
  },
  filter: {
    category_id: '',
    tag_search: '',
  }
};

const attractionSlice = createSlice({
  name: 'attraction',
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

    changeFilterValue: (state, action) => {
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload,
        },
      };
    },

    updateAttractionList: (state, action) => {
      return {
        ...state,
        attractionsList: action.payload,
      };
    },

    updateSelectedAttraction: (state, action) => {
      return {
        ...state,
        selected: {
          ...state.selected,
          attraction_id: action.payload.id,
          name: action.payload.name,
          description: action.payload.description,
          category_id: action.payload.category_id,
          tags: action.payload.tags,
          pictures: action.payload.pictures,
        },
      };
    },

    resetAttractionState: (state) => {
      return {
        ...state,
        settings: {
          ...state.settings,
          name: '',
          description: '',
          category_id: 0,
          message: '',
        },
      };
    },
  },
});

export const {
  updateAttractionList,
  updateSelectedAttraction,
  changeInputValue,
  changeFilterValue,
  resetAttractionState,
} = attractionSlice.actions;

export default attractionSlice.reducer;
