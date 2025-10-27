import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { loginUserApi, registerUserApi, TLoginData, TRegisterData } from '@api';

type TUserState = {
  refreshToken: string;
  accessToken: string;
  user: TUser | null;
  isRegisterSuccess: boolean;
  isLoginSuccess: boolean;
  errorText: string | undefined;
};

const initialState: TUserState = {
  refreshToken: '',
  accessToken: '',
  user: null,
  isRegisterSuccess: false,
  isLoginSuccess: false,
  errorText: ''
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (registerData: TRegisterData) => await registerUserApi(registerData)
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData) => await loginUserApi(loginData)
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
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
