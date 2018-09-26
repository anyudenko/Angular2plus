import { Component, OnInit } from '@angular/core';

import { Cart } from '../../models/cart.model';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.less']
})
export class CartListComponent implements OnInit {
  cartList:Cart[] = [];
  cartTotal:any = {};

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getCartProducts()
      .then(products => this.cartList = products);

    this.cartService.getTotalInfo()
      .then(data => this.cartTotal = data);
  }

  onDeleteProductFromCart(id: number): void {
    this.cartService.deleteProduct(id);
    this.cartService.getCartProducts()
      .then(products => this.cartList = products);
  }

  onCartProductQtyDecrease(id: number): void {
    this.cartService.decreaseProductQty(id);
  }

  onCartProductQtyIncrease(id: number): void {
    this.cartService.increaseProductQty(id);
  }
}
