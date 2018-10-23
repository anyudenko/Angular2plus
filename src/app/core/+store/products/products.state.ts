import { Product } from './../../../products/models/product.model';

export interface ProductsState {
  data: ReadonlyArray<Product>;
  readonly error: Error | string;
}

export const initialProductsState: ProductsState = {
  data: [],
  error: null
};
