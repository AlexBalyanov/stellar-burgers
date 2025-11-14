import {
  burgerIngredientsSlice,
  getIngredients,
  initialState
} from '../services/slices/burgerIngredientsSlice';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;

const mockData = {
  ingredients: [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      id: '111'
    },
    {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
      id: '222'
    },
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      id: '333'
    }
  ],
  isLoading: false
};

describe('Проверка слайса с получением ингредиентов', () => {
  it('Слайс инициализируется корректно', () => {
    const state = burgerIngredientsSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('Загрузка ингредиентов', () => {
    const action = { type: getIngredients.pending.type };
    const state = burgerIngredientsSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, isLoading: true });
  });

  it('Ингредиенты не получены', () => {
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Error Message' }
    };
    const state = burgerIngredientsSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, isLoading: false });
  });

  it('Ингредиенты получены', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: [mockData.ingredients]
    };
    const state = burgerIngredientsSlice.reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      ingredients: [mockData.ingredients]
    });
  });
});
