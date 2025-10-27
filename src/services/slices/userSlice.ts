import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { getCookie, setCookie } from '../../utils/cookie';

type TUserState = {
  refreshToken: string;
  accessToken: string;
  user: TUser | null;
  isRegisterSuccess: boolean;
  isLoginSuccess: boolean;
  isAuthChecked: boolean;
  errorText: string | undefined;
};

const initialState: TUserState = {
  refreshToken: '',
  accessToken: '',
  user: null,
  isRegisterSuccess: false,
  isLoginSuccess: false,
  isAuthChecked: false,
  errorText: ''
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (registerData: TRegisterData) => {
    const res = await registerUserApi(registerData);
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);
    return res;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData) => {
    const res = await loginUserApi(loginData);
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);
    return res;
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) =>
    await getUserApi()
      .then((res) => {
        dispatch(setUser(res.user));
      })
      .finally(() => {
        dispatch(setIsAuthChecked(true));
      })
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isRegisterSuccess = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isRegisterSuccess = false;
      state.errorText = action.error.message;
      console.log(action.error.message);
    });
    builder.addCase(registerUser.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
      isRegisterSuccess: true,
      errorText: ''
    }));

    builder.addCase(loginUser.pending, (state) => {
      state.isLoginSuccess = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoginSuccess = false;
      state.errorText = action.error.message;
      console.log(action.error.message);
    });
    builder.addCase(loginUser.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
      isLoginSuccess: true,
      errorText: ''
    }));
  }
});

export const { setUser, setIsAuthChecked } = userSlice.actions;
