import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TConstructorState = {
  ingredients: TIngredient[];
  bun: TIngredient | null;
};

const initialState: TConstructorState = {
  ingredients: [],
  bun: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients = [...state.ingredients, action.payload];
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item._id !== action.payload
      );
    },
    moveUp: (state, action: PayloadAction<number>) => {
      const currentElement = action.payload;
      const upperElement = action.payload - 1;
      [state.ingredients[currentElement], state.ingredients[upperElement]] = [
        state.ingredients[upperElement],
        state.ingredients[currentElement]
      ];
    },
    moveDown: (state, action: PayloadAction<number>) => {
      const currentElement = action.payload;
      const downElement = action.payload + 1;
      [state.ingredients[currentElement], state.ingredients[downElement]] = [
        state.ingredients[downElement],
        state.ingredients[currentElement]
      ];
    }
  }
});

export const { addIngredient, removeIngredient, moveUp, moveDown } =
  burgerConstructorSlice.actions;
