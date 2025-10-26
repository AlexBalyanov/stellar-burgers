import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { registerUserApi, TRegisterData } from '@api';

type userState = {
  refreshToken: string;
  accessToken: string;
  user: TUser | null;
  isSuccess: boolean;
  errorText: string | undefined;
};

const initialState: userState = {
  refreshToken: '',
  accessToken: '',
  user: null,
  isSuccess: false,
  errorText: ''
};

export const registerUser = createAsyncThunk(
  'user/register',
  async (registerData: TRegisterData) => await registerUserApi(registerData)
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isSuccess = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isSuccess = false;
      state.errorText = action.error.message;
      console.log(action.error.message);
    });
    builder.addCase(registerUser.fulfilled, (_, action) => ({
      ...action.payload,
      isSuccess: true,
      errorText: ''
    }));
  }
});
