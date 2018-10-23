import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as ProductsActions from './products.actions';

import { Observable } from 'rxjs';
import { switchMap, concatMap, pluck, map } from 'rxjs/operators';

import { ProductsPromiseService } from './../../../products/services';
import { Product } from './../../../products/models/product.model';

import * as RouterActions from './../router/router.actions';


@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsPromiseService: ProductsPromiseService
  ) {
    console.log('Effects works');
  }

  @Effect()
  getProducts$: Observable<Action> = this.actions$.pipe(
    ofType<ProductsActions.GetProducts>(
      ProductsActions.ProductsActionTypes.GET_PRODUCTS
    ),
    switchMap((action: ProductsActions.GetProducts) =>
      this.productsPromiseService
        .getProducts()
        .then(products =>
          new ProductsActions.GetProductsSuccess(products)
        )
        .catch(err =>
          new ProductsActions.GetProductsError(err)
        )
    )
  );

  @Effect()
  deleteProducts$: Observable<Action> = this.actions$.pipe(
    ofType<ProductsActions.DeleteProduct>(
      ProductsActions.ProductsActionTypes.DELETE_PRODUCT
    ),
    pluck('payload'),
    concatMap((payload: Product) =>
      this.productsPromiseService
        .deleteProduct(payload)
        .then(() => {
            return new ProductsActions.DeleteProductSuccess(payload);
          }
        )
        .catch(err =>
          new ProductsActions.DeleteProductError(err)
        )
    )
  );

  @Effect()
  createProduct$: Observable<Action> = this.actions$.pipe(
    ofType<ProductsActions.CreateProduct>(
      ProductsActions.ProductsActionTypes.CREATE_PRODUCT
    ),
    pluck('payload'),
    concatMap((payload: Product) =>
      this.productsPromiseService
        .createProduct(payload)
        .then(task => new ProductsActions.CreateProductSuccess(task))
        .catch(err => new ProductsActions.CreateProductError(err))
    )
  );

  @Effect()
  updateProduct$: Observable<Action> = this.actions$.pipe(
    ofType<ProductsActions.UpdateProduct>(
      ProductsActions.ProductsActionTypes.UPDATE_PRODUCT
    ),
    pluck('payload'),
    concatMap((payload: Product) =>
      this.productsPromiseService
        .updateProduct(payload)
        .then(task => new ProductsActions.UpdateProductSuccess(task))
        .catch(err => new ProductsActions.UpdateProductError(err))
    )
  );

  @Effect()
  createUpdateTaskSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<ProductsActions.CreateProduct | ProductsActions.UpdateProduct>(
      ProductsActions.ProductsActionTypes.CREATE_PRODUCT_SUCCESS,
      ProductsActions.ProductsActionTypes.UPDATE_PRODUCT_SUCCESS
    ),
    map(action =>
      new RouterActions.Go({
        path: ['/admin/products']
      })
    )
  );
}
