import { IProduct } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ICart {
    products: IProduct[];
    total: number;
}
const initialState: ICart = {
    products: [],
    total:0
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const existing = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (existing) {
     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
     existing.quantity! +=1
      } else {
          state.products.push({ ...action.payload, quantity: 1 });
          }
          state.total += action.payload.price
      },
      removeOneCart: (state, action: PayloadAction<IProduct>) => {
        const existing = state.products.find(
            (product) => product._id === action.payload._id
          );
          if (existing && existing.quantity! > 1) {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
         existing.quantity! -=1
          } else {
            state.products = state.products.filter(product=>product._id !== action.payload._id)
          }
          state.total -= action.payload.price
      },
      removeFormCart: (state, action: PayloadAction<IProduct>) => {
          state.products = state.products.filter(product => product._id !== action.payload._id)
          state.total -= action.payload.price * action.payload.quantity!
      }
  },
});

export const { addToCart,removeOneCart,removeFormCart } = cartSlice.actions;
export default cartSlice.reducer;
