import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

type TOrderBurgerState = {
  isLoading: boolean;
  orderData: TOrder | null;
};

const initialState: TOrderBurgerState = {
  isLoading: false,
  orderData: null
};

export const orderBurger = createAsyncThunk(
  'orderBurger/send',
  async (ingredients: string[]) => await orderBurgerApi(ingredients)
);

export const orderBurgerSlice = createSlice({
  name: 'orderBurger',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state = initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(orderBurger.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(orderBurger.rejected, (stat, action) => {
      stat.isLoading = false;
      console.log(action.error.message);
    });
    builder.addCase(orderBurger.fulfilled, (state, action) => {
      state.orderData = action.payload.order;
    });
  }
});

export const { clearOrder } = orderBurgerSlice.actions;
