import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductsState } from './products.state';
import { Product } from './../../../products/models/product.model';
import { getRouterState } from './../router';


export const getProductsState = createFeatureSelector<ProductsState>('products');

export const getProductsData = createSelector(
  getProductsState,
  (state: ProductsState) => state.data
);

export const getProductsError = createSelector(
  getProductsState,
  (state: ProductsState) => state.error
);

export const getProductByUrl = createSelector(
  getProductsData,
  getRouterState,
  (products, router): Product => {
    const productID = router.state.params.productID;

    if (productID) {
      return products.find(product =>
        product.id === +productID
      );
    } else {
      return new Product();
    }
  }
);
