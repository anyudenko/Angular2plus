import { Component, OnInit, Input } from '@angular/core';

import { Store, select } from '@ngrx/store';
import {
  AppState,
  ProductsState,
  getProductsState,
  getProductsData,
  getProductsError } from './../../../core/+store';
import * as ProductsActions from './../../../core/+store/products/products.actions';
import * as RouterActions from './../../../core/+store/router/router.actions';

import { Subscription, Observable } from 'rxjs';

import { Product } from '../../models';
import { CartObservableService } from '../../../cart';

import { AutoUnsubscribe } from '../../../core';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
@AutoUnsubscribe()
export class ProductListComponent implements OnInit {
  @Input() mode?:string;

  products$: Observable<ReadonlyArray<Product>>;
  productsError$: Observable<Error | string>;

  private sub: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;

  constructor(
    private cartObservableService: CartObservableService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    console.log('Store works', this.store);

    this.products$ = this.store.pipe(select(getProductsData));
    this.productsError$ = this.store.pipe(select(getProductsError));

    this.store.dispatch(new ProductsActions.GetProducts());

    this.mode = this.mode == 'admin' ? 'admin' : 'guest';
  }

  onBuyProduct(product): void {
    if(product.product.isAvailable) {
      const cartItem = product.product;
      cartItem.qty = product.qty;

      this.sub = this.cartObservableService
        .getCartProduct(cartItem.id)
        .subscribe(
          data => {
            //update
            cartItem.qty += data.qty;
            this.sub2 = this.cartObservableService
              .updateCartItem(cartItem)
              .subscribe();
          },
          error => {
            //create
            this.sub3 = this.cartObservableService
              .createCartItem(cartItem)
              .subscribe();
          }
        );
    }
  }

  onEditProduct(product) {
    const link = ['/edit', product.id];

    this.store.dispatch(new RouterActions.Go({
      path: link
    }));
  }

  onDeleteProduct(product) {
    this.store.dispatch(new ProductsActions.DeleteProduct(product));
  }

  onCreateProduct(product) {
    this.store.dispatch(new RouterActions.Go({
      path: ['/new']
    }));
  }
}
