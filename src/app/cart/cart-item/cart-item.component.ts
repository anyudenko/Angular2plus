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
  onDelete: EventEmitter<number> = new EventEmitter();

  @Output()
  onQtyDecrease: EventEmitter<number> = new EventEmitter();

  @Output()
  onQtyIncrease: EventEmitter<number> = new EventEmitter();

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
    this.onDelete.emit(this.cartItem.id);
  }

  onProductQtyDecrease() {
    this.onQtyDecrease.emit(this.cartItem.id);
  }

  onProductQtyIncrease() {
    this.onQtyIncrease.emit(this.cartItem.id);
  }
}
