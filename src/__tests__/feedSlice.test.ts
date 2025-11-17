import { feedSlice, getFeed, initialState } from '../services/slices/feedSlice';

const mockData = {
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
  ],
  total: 2,
  totalToday: 2
};

describe('Проврка слайса ленты заказов', () => {
  it('Слайс инициализируется корректно', () => {
    const state = feedSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('Получение ленты заказов - загрузка', () => {
    const action = { type: getFeed.pending.type };
    const state = feedSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, isLoading: true });
  });

  it('Получение ленты заказов - ошибка', () => {
    const action = {
      type: getFeed.rejected.type,
      error: { message: 'Error Message' }
    };
    const state = feedSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, isLoading: false });
  });

  it('Получение ленты заказов - успешно', () => {
    const action = {
      type: getFeed.fulfilled.type,
      payload: mockData
    };
    const state = feedSlice.reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
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
      ],
      total: 2,
      totalToday: 2
    });
  });
});
