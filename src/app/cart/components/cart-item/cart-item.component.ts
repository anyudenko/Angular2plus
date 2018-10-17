import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Cart } from '../../models';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.less']
})
export class CartItemComponent implements OnInit {
  @Input() cartItem:Cart;

  @Output()
  deleteProduct: EventEmitter<Cart> = new EventEmitter();

  @Output()
  qtyDecrease: EventEmitter<Cart> = new EventEmitter();

  @Output()
  qtyIncrease: EventEmitter<Cart> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onDeleteProduct() {
    this.deleteProduct.emit(this.cartItem);
  }

  onProductQtyDecrease() {
    this.qtyDecrease.emit(this.cartItem);
  }

  onProductQtyIncrease() {
    this.qtyIncrease.emit(this.cartItem);
  }
}
