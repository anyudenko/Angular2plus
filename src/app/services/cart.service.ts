import { Injectable } from '@angular/core';

import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartProducts:Cart[] = [];

  constructor() { }

  getCartProducts() {
    return Promise.resolve(this.cartProducts);
  }

  addProduct(product) {
    let isNewItem:boolean = true;

    for (let i = 0; i < this.cartProducts.length; i++)  {
      if (this.cartProducts[i].id === product.id) {
        this.cartProducts[i].qty += 1;
        isNewItem = false;
      }
    }

    if(isNewItem) {
      product.qty = 1;
      this.cartProducts.push(product);
    }
  }

  deleteProduct(id) {
    let index = 0;

    for (let i = 0; i < this.cartProducts.length; i++)  {
      if ( this.cartProducts[i].id === id) {
        index = i;
      }
    }

    this.cartProducts.splice(index, 1);
  }
}
