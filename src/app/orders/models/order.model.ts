import { Cart } from '../../cart/models';

export class Order {
  constructor(
    public id: number = null,
    public cart:Cart[],
    public totalPrice: number,
    public totalQty: number
  ) { }
}


