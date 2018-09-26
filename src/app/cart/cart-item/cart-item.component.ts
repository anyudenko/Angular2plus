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
  onDelete: EventEmitter<number> = new EventEmitter();

  @Output()
  onQtyDecrease: EventEmitter<number> = new EventEmitter();

  @Output()
  onQtyIncrease: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onDeleteProduct() {
    this.onDelete.emit(this.cartItem.id);
  }

  onProductQtyDecrease() {
    this.onQtyDecrease.emit(this.cartItem.id);
  }

  onProductQtyIncrease() {
    this.onQtyIncrease.emit(this.cartItem.id);
  }
}
