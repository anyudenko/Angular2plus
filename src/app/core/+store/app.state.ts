import { ProductsState } from './products';
import { CartState } from './cart';

export interface AppState {
  products: ProductsState;
  cart: CartState;
}
