import {
  createEntityAdapter,
  EntityState,
  EntityAdapter } from '@ngrx/entity';

import { Product } from './../../../products/models/product.model';


export interface ProductsState extends EntityState<Product> {
  readonly error: Error | string;
}

export const productAdapter: EntityAdapter<Product> =
  createEntityAdapter<Product>();

export const initialProductsState: ProductsState =
  productAdapter.getInitialState({
    error: null
  });
