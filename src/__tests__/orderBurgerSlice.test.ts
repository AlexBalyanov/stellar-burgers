import {
  getOrderByNumber,
  initialState,
  orderBurger,
  orderBurgerSlice
} from '../services/slices/orderBurgerSlice';

const mockData = {
  order: {
    _id: '6900de6d74993f001b5bbb65',
    status: 'done',
    name: 'Моковый люминесцентный бургер',
    createdAt: '2025-10-28T15:17:01.813Z',
    updatedAt: '2025-10-28T15:17:02.925Z',
    number: 666,
    ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa0941']
  }
};

const mockDataOrders = {
  orders: [
    {
      _id: '6900de6d74993f001b5bbb65',
      status: 'done',
      name: 'Моковый люминесцентный бургер',
      createdAt: '2025-10-28T15:17:01.813Z',
      updatedAt: '2025-10-28T15:17:02.925Z',
      number: 666,
      ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa0941']
    },
    {
      _id: '6900de6d74993f02222222',
      status: 'done',
      name: 'Моковый люминесцентный бургер',
      createdAt: '2025-10-28T15:17:01.813Z',
      updatedAt: '2025-10-28T15:17:02.925Z',
      number: 777,
      ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa0941']
    }
  ]
};

describe('Проврка слайса оформления заказа', () => {
  it('Слайс инициализируется корректно', () => {
    const state = orderBurgerSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('Оформление заказа - загрузка', () => {
    const action = { type: orderBurger.pending.type };
    const state = orderBurgerSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, isLoading: true });
  });

  it('Оформление заказа - ошибка', () => {
    const action = {
      type: orderBurger.rejected.type,
      error: { message: 'Error Message' }
    };
    const state = orderBurgerSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, isLoading: false });
  });

  it('Оформление заказа - успешно', () => {
    const action = {
      type: orderBurger.fulfilled.type,
      payload: mockData
    };
    const state = orderBurgerSlice.reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      isOrderSuccess: true,
      orderData: {
        _id: '6900de6d74993f001b5bbb65',
        status: 'done',
        name: 'Моковый люминесцентный бургер',
        createdAt: '2025-10-28T15:17:01.813Z',
        updatedAt: '2025-10-28T15:17:02.925Z',
        number: 666,
        ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa0941']
      }
    });
  });

  it('Получение заказа по номеру - ошибка', () => {
    const action = {
      type: getOrderByNumber.rejected.type,
      error: { message: 'Error Message' }
    };
    const state = orderBurgerSlice.reducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('Получение заказа по номеру - успешно', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: mockDataOrders
    };
    const state = orderBurgerSlice.reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      orderByNumber: {
        _id: '6900de6d74993f001b5bbb65',
        status: 'done',
        name: 'Моковый люминесцентный бургер',
        createdAt: '2025-10-28T15:17:01.813Z',
        updatedAt: '2025-10-28T15:17:02.925Z',
        number: 666,
        ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa0941']
      }
    });
  });
});
