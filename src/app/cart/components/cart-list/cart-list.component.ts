import { Component, OnInit } from '@angular/core';

import { Cart } from '../../models';

import { CartService } from '../../services';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.less']
})
export class CartListComponent implements OnInit {
  cartList:Cart[] = [];
  cartTotal:any = {};

  //sort functionality
  sortByOptions:any[] = [
    { title: 'price', value: 'price'},
    { title: 'title', value: 'name'},
    { title: 'qty', value: 'qty'}
  ];
  sortBy:string = this.sortByOptions[1].value;
  sortOrder:boolean = false;


  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.getCartProducts();

    this.cartService.getTotalInfo()
      .then(data => this.cartTotal = data);
  }

  getCartProducts() {
    this.cartService.getCartProducts()
      .then(products => this.cartList = products);
  }

  onDeleteProductFromCart(id: number): void {
    this.cartService.deleteProduct(id);
    this.getCartProducts();
  }

  onCartProductQtyDecrease(id: number): void {
    this.cartService.decreaseProductQty(id);
  }

  onCartProductQtyIncrease(id: number): void {
    this.cartService.increaseProductQty(id);
  }

  onClearCart() {
    this.cartService.clearCart();
    this.getCartProducts();
  }
}
