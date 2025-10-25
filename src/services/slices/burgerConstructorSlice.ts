import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TConstructorState = {
  ingredients: TIngredient[];
};

const initialState: TConstructorState = {
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients = [...state.ingredients, action.payload];
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients.filter((item) => item._id !== action.payload);
    }
  }
});

export const { addIngredient, removeIngredient } =
  burgerConstructorSlice.actions;
