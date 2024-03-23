import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  settings: {
    hotel: false,
    duration: 0,
    price: 0,
  },
  priceList: [],
};

const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    changeHotelValue: (state, action) => {
      return {
        ...state,
        settings: {
          ...state.settings,
          hotel: action.payload,
        },
      };
    },

    changeDurationlValue: (state, action) => {
      return {
        ...state,
        settings: {
          ...state.settings,
          duration: action.payload,
        },
      };
    },

    changePricelValue: (state, action) => {
      return {
        ...state,
        settings: {
          ...state.settings,
          price: action.payload,
        },
      };
    },

    updatePriceList: (state, action) => {
      return {
        ...state,
        priceList: action.payload,
      };
    },

    resetPriceState: (state, action) => {
      return {
        ...state,
        settings: {
          ...state.settings,
          hotel: false,
          duration: 0,
          price: 0,
        },
      }
    }
  },
});

export const {
  updatePriceList,
  changeHotelValue,
  changeDurationlValue,
  changePricelValue,
  resetPriceState,
} = priceSlice.actions;

export default priceSlice.reducer;
