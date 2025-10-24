import { createSlice } from '@reduxjs/toolkit';
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
    addIngredient: (state) => {},
    removeIngredient: (state) => {}
  }
});
