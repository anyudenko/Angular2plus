import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

import { Cart } from '../models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {

  @Input() cartList:Cart[];

  @Output()
  onDelete: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onDeleteProduct(id: number) {
    this.onDelete.emit(id);
  }
}
