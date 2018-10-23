import { Cart } from './../../../cart/models/cart.model';

export interface CartState {
  data: ReadonlyArray<Cart>;
}

export const initialCartState: CartState = {
  data: []
};
