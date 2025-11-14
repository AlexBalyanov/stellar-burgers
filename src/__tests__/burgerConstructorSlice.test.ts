import {
  addIngredient,
  burgerConstructorSlice,
  clearConstructor,
  initialState,
  moveDown,
  removeIngredient
} from '../services/slices/burgerConstructorSlice';

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
    }
  ],
  bun: {
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
};

const mockDataMoveDown = {
  ingredients: [
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
    }
  ],
  bun: {
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
};

describe('Проверка слайса конструктора', () => {
  it('Слайс инициализируется корректно', () => {
    const state = burgerConstructorSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('Проверка добавления ингредиента', () => {
    const action = {
      type: addIngredient.type,
      payload: mockData.ingredients[0]
    };
    const state = burgerConstructorSlice.reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      ingredients: [mockData.ingredients[0]]
    });
  });

  it('Проверка удаления ингредиента', () => {
    const action = {
      type: removeIngredient.type,
      payload: mockData.ingredients[0].id
    };
    const prevState = {
      ...initialState,
      ingredients: [mockData.ingredients[0]]
    };
    const state = burgerConstructorSlice.reducer(prevState, action);

    expect(state).toEqual(initialState);
  });

  it('Проверка переставления ингредиентов местами', () => {
    const action = {
      type: moveDown.type,
      payload: 0
    };
    const prevState = {
      ...initialState,
      ingredients: mockData.ingredients
    };
    const state = burgerConstructorSlice.reducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      ingredients: mockDataMoveDown.ingredients
    });
  });

  it('Проверка очистки конструктора', () => {
    const action = {
      type: clearConstructor.type
    };
    const prevState = {
      ...mockData
    };
    const state = burgerConstructorSlice.reducer(prevState, action);

    expect(state).toEqual(initialState);
  });
});
