import { Component, OnInit, Input, Output, EventEmitter,
 HostBinding, HostListener} from '@angular/core';

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

  @HostBinding('class') className = 'cart-item-host-class';

  @HostListener('mouseenter', ['$event'])
  enter(event: Event) {
    (<HTMLTextAreaElement>(<HTMLTextAreaElement>event.target).children[0]).style.backgroundColor = '#eee';
  }

  @HostListener('mouseleave', ['$event'])
  leave(event: Event) {
    (<HTMLTextAreaElement>(<HTMLTextAreaElement>event.target).children[0]).style.backgroundColor = '';
  }

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
