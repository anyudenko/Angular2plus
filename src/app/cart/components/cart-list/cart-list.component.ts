import { Component, OnInit, OnDestroy } from '@angular/core';

// rxjs
import { Observable, Subscription, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Cart } from '../../models';

import { CartObservableService } from '../../services';
import { OrderService } from '../../../orders';

import { AutoUnsubscribe } from '../../../core';

import { Store } from '@ngrx/store';
import { AppState } from './../../../core/+store';
import * as RouterActions from './../../../core/+store/router/router.actions';


@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.less']
})
export class CartListComponent implements OnInit {
  cartList:Cart[] = [];
  cartTotal:any = {
    totalQty: 0,
    totalPrice: 0
  };

  private sub: Subscription;

  //sort functionality
  sortByOptions:any[] = [
    { title: 'price', value: 'price'},
    { title: 'title', value: 'name'},
    { title: 'qty', value: 'qty'}
  ];
  sortBy:string = this.sortByOptions[1].value;
  sortOrder:boolean = false;


  constructor(
    private cartObservableService: CartObservableService,
    private orderService: OrderService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.sub = this.cartObservableService.getCartProducts()
      .subscribe(products => {
        this.cartList = products;
        this.generateTotalInfo();
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onDeleteProductFromCart(cartItem: Cart): void {
    this.deleteCartItem(cartItem);
  }

  onCartProductQtyDecrease(cartItem: Cart): void {
    cartItem.qty = cartItem.qty - 1;
    this.updateProductQty(cartItem);
  }

  onCartProductQtyIncrease(cartItem: Cart): void {
    cartItem.qty = cartItem.qty + 1;
    this.updateProductQty(cartItem);
  }

  onClearCart() {
    for (let i = 0; i < this.cartList.length; i++)  {
      this.deleteCartItem(this.cartList[i]);
    }
  }

  onCompleteOrder() {
    /*let order = {
      id: null,
      cart: this.cartList,
      totalPrice: this.cartTotal.totalPrice,
      totalQty: this.cartTotal.totalQty
    };
    this.orderService.addOrder(order);
    this.onClearCart();*/
    this.store.dispatch(new RouterActions.Go({
      path: ['/complete-orders']
    }));
  }

  deleteCartItem(cartItem) {
    const sub = this.cartObservableService.deleteCartItem(cartItem)
      .subscribe(
        (products) => {
          this.cartList = products;
          this.generateTotalInfo();
        },
        error => console.log(error)
      );

    this.sub.add(sub);
  }

  updateProductQty(cartItem) {
    if(cartItem.qty == 0) {
      this.deleteCartItem(cartItem);
    } else {
      const sub = this.cartObservableService.updateCartItem(cartItem)
        .subscribe(
          () => {
            this.generateTotalInfo();
          },
          error => console.log(error)
        );

      this.sub.add(sub);
    }
  }

  generateTotalInfo() {
    let totalQty = 0;
    let totalPrice = 0;

    for (let i = 0; i < this.cartList.length; i++)  {
      totalQty += this.cartList[i].qty;
      totalPrice += (this.cartList[i].qty * this.cartList[i].price);
    }

    this.cartTotal.totalQty = totalQty;
    this.cartTotal.totalPrice = totalPrice;
  }
}
