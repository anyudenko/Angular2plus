import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Cart } from '../../models/cart.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.less']
})
export class CartItemComponent implements OnInit {
  @Input() cartItem:Cart;

  @Output()
  deleteProduct: EventEmitter<number> = new EventEmitter();

  @Output()
  qtyDecrease: EventEmitter<number> = new EventEmitter();

  @Output()
  qtyIncrease: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onDeleteProduct() {
    this.deleteProduct.emit(this.cartItem.id);
  }

  onProductQtyDecrease() {
    this.qtyDecrease.emit(this.cartItem.id);
  }

  onProductQtyIncrease() {
    this.qtyIncrease.emit(this.cartItem.id);
  }
}
