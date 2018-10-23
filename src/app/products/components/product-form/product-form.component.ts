import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';
import {
  AppState,
  ProductsState,
  getProductByUrl } from './../../../core/+store';
import * as ProductsActions from './../../../core/+store/products/products.actions';
import * as RouterActions from './../../../core/+store/router/router.actions';

import { Product } from '../../models';
import { ProductsPromiseService } from '../../services';


@Component({
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.less']
})
export class ProductFormComponent implements OnInit {
  product:Product;
  private sub: Subscription;

  constructor(
    private productsPromiseService: ProductsPromiseService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.product = new Product();

    this.sub = this.store
      .pipe(select(getProductByUrl))
      .subscribe(product => this.product = product);
  }

  onSaveProduct() {
    const product = { ...this.product };

    if(product.id) {
      this.store.dispatch(new ProductsActions.UpdateProduct(product));
    } else {
      this.store.dispatch(new ProductsActions.CreateProduct(product));
    }
  }

  onGoBack() {
    this.store.dispatch(new RouterActions.Go({
      path: ['/admin/products']
    }));
  }
}
