import {
  getUserOrders,
  initialState,
  loginUser,
  registerUser,
  setIsAuthChecked,
  setUser,
  updateUser,
  userLogout,
  userSlice
} from '../services/slices/userSlice';

const mockData = {
  user: {
    name: 'Александр Б',
    email: 'sanya@sanya.com'
  },
  accessToken: 'access-token',
  refreshToken: 'refresh-token'
};

const mockDataUpdatedUser = {
  user: {
    name: 'Стас Басов',
    email: 'stas@basov.com'
  }
};

const mockDataOrders = {
  _id: '6900de6d74993f001b5bbb65',
  status: 'done',
  name: 'Моковый люминесцентный бургер',
  createdAt: '2025-10-28T15:17:01.813Z',
  updatedAt: '2025-10-28T15:17:02.925Z',
  number: 666,
  ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa0941']
};

describe('Проврка слайса пользователя', () => {
  it('Слайс инициализируется корректно', () => {
    const state = userSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('Установка флага проверки авторизации пользователя', () => {
    const action = { type: setIsAuthChecked.type, payload: true };
    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, isAuthChecked: true });
  });

  it('Установка данных пользователя в стор', () => {
    const action = {
      type: setUser.type,
      payload: mockDataUpdatedUser.user
    };
    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      user: {
        name: 'Стас Басов',
        email: 'stas@basov.com'
      }
    });
  });

  it('Регистрация пользователя - загрузка', () => {
    const action = { type: registerUser.pending.type };
    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, isRegisterSuccess: false });
  });

  it('Регистрация пользователя - ошибка', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Error Message' }
    };
    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      errorText: 'Error Message',
      isRegisterSuccess: false
    });
  });

  it('Регистрация пользователя - успешно', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: mockData
    };
    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isRegisterSuccess: true,
      user: {
        name: 'Александр Б',
        email: 'sanya@sanya.com'
      },
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      errorText: ''
    });
  });

  it('Логин пользователя - загрузка', () => {
    const action = { type: loginUser.pending.type };
    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({ ...initialState, isLoginSuccess: false });
  });

  it('Логин пользователя - ошибка', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Error Message' }
    };
    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoginSuccess: false,
      errorText: 'Error Message'
    });
  });

  it('Логин пользователя - успешно', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockData
    };
    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoginSuccess: true,
      user: {
        name: 'Александр Б',
        email: 'sanya@sanya.com'
      },
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      errorText: ''
    });
  });

  it('Обновление данных пользователя - загрузка', () => {
    const action = { type: updateUser.pending.type };

    const prevState = { ...initialState, mockData };
    const state = userSlice.reducer(prevState, action);

    expect(state).toEqual({ ...prevState, isUpdateSuccess: false });
  });

  it('Обновление данных пользователя - ошибка', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'Error Message' }
    };

    const prevState = { ...initialState, mockData };
    const state = userSlice.reducer(prevState, action);

    expect(state).toEqual({ ...prevState, isUpdateSuccess: false });
  });

  it('Обновление данных пользователя - успешно', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: mockDataUpdatedUser
    };

    const prevState = { ...initialState, mockData };
    const state = userSlice.reducer(prevState, action);

    expect(state).toEqual({
      ...prevState,
      isUpdateSuccess: true,
      user: {
        name: 'Стас Басов',
        email: 'stas@basov.com'
      }
    });
  });

  it('Получение заказов пользователя - ошибка', () => {
    const action = {
      type: getUserOrders.rejected.type,
      error: { message: 'Error Message' }
    };

    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('Получение заказов пользователя - успешно', () => {
    const action = {
      type: getUserOrders.fulfilled.type,
      payload: mockDataOrders
    };

    const state = userSlice.reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      userOrders: {
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

  it('Логаут пользователя - ошибка', () => {
    const action = {
      type: userLogout.rejected.type,
      error: { message: 'Error Message' }
    };

    const prevState = { ...initialState, mockData };
    const state = userSlice.reducer(prevState, action);

    expect(state).toEqual(prevState);
  });

  it('Логаут пользователя - успешно', () => {
    const action = {
      type: userLogout.fulfilled.type
    };

    const prevState = { ...initialState, mockData };
    const state = userSlice.reducer(prevState, action);

    expect(state).toEqual({ ...initialState, isAuthChecked: true });
  });
});
