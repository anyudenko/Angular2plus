import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductsState, productAdapter } from './products.state';
import { Product } from './../../../products/models/product.model';
import { getRouterState } from './../router';


export const getProductsState = createFeatureSelector<ProductsState>('products');

export const {
  selectEntities: getProductsEntities,
  selectAll: getProductsData
} = productAdapter.getSelectors(getProductsState);

export const getProductsError = createSelector(
  getProductsState,
  (state: ProductsState) => state.error
);

export const getProductByUrl = createSelector(
  getProductsEntities,
  getRouterState,
  (products, router): Product => {
    const productID = router.state.params.productID;

    if (productID) {
      return products[productID];
    } else {
      return new Product();
    }
  }
);
