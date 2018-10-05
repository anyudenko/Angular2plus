import { Injectable } from '@angular/core';

import { Cart } from '../../cart/models';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartProducts:Cart[] = [];

  cartTotal:any = {
    totalQty: 0,
    totalPrice: 0
  };

  constructor() { }

  getCartProducts() {
    return Promise.resolve(this.cartProducts);
  }

  addProduct(product, qty) {
    let isNewItem:boolean = true;

    for (let i = 0; i < this.cartProducts.length; i++)  {
      if (this.cartProducts[i].id === product.id) {
        this.cartProducts[i].qty += qty;
        isNewItem = false;
      }
    }

    if(isNewItem) {
      product.qty = qty;
      this.cartProducts.push(product);
    }

    this.generateTotalInfo();
  }

  deleteProduct(id) {
    let index = 0;

    for (let i = 0; i < this.cartProducts.length; i++)  {
      if ( this.cartProducts[i].id === id) {
        index = i;
      }
    }

    this.cartProducts.splice(index, 1);
    this.generateTotalInfo();
  }

  increaseProductQty(id) {
    this.updateProductQty(id, 1);
  }

  decreaseProductQty(id) {
    this.updateProductQty(id, -1);
  }

  updateProductQty(id, qty) {
    for (let i = 0; i < this.cartProducts.length; i++)  {
      if (this.cartProducts[i].id === id) {
        this.cartProducts[i].qty += qty;

        if(this.cartProducts[i].qty == 0) {
          this.deleteProduct(id);
        }
      }
    }

    this.generateTotalInfo();
  }

  getTotalInfo() {
    return Promise.resolve(this.cartTotal);
  }

  generateTotalInfo() {
    let totalQty = 0;
    let totalPrice = 0;

    for (let i = 0; i < this.cartProducts.length; i++)  {
      totalQty += this.cartProducts[i].qty;
      totalPrice += (this.cartProducts[i].qty * this.cartProducts[i].price);
    }

    this.cartTotal.totalQty = totalQty;
    this.cartTotal.totalPrice = totalPrice;
  }

  clearCart() {
    this.cartProducts = [];
    this.generateTotalInfo();
  }
}
