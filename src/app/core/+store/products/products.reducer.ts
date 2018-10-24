import {
  ProductsState,
  initialProductsState,
  productAdapter } from './products.state';
import { ProductsActions, ProductsActionTypes } from './products.actions';

import { Product } from './../../../products/models/product.model';

export function productsReducer(
  state = initialProductsState,
  action: ProductsActions
): ProductsState {
  console.log(`Reducer works, Action type: ${action.type}`);

  switch (action.type) {
    // GET_PRODUCTS
    case ProductsActionTypes.GET_PRODUCTS: {
      return {...state};
    }

    case ProductsActionTypes.GET_PRODUCTS_SUCCESS: {
      const products = [...<Array<Product>>action.payload];

      return productAdapter.addAll(
        products,
        {...state}
      );
    }

    case ProductsActionTypes.GET_PRODUCTS_ERROR: {
      const error = action.payload;
      return {
        ...state,
        error
      };
    }


    // DELETE_PRODUCT
    case ProductsActionTypes.DELETE_PRODUCT: {
      return {...state};
    }

    case ProductsActionTypes.DELETE_PRODUCT_SUCCESS: {
      const product = { ...<Product>action.payload };
      return productAdapter.removeOne(product.id, state);
    }

    case ProductsActionTypes.DELETE_PRODUCT_ERROR: {
      const error = action.payload;
      return {
        ...state,
        error
      };
    }


    // CREATE_PRODUCT
    case ProductsActionTypes.CREATE_PRODUCT: {
      return {...state};
    }

    case ProductsActionTypes.CREATE_PRODUCT_SUCCESS: {
      const product = { ...<Product>action.payload };
      return productAdapter.addOne(product, state);
    }

    case ProductsActionTypes.CREATE_PRODUCT_ERROR: {
      const error = action.payload;
      return {
        ...state,
        error
      };
    }


    // UPDATE_PRODUCT
    case ProductsActionTypes.UPDATE_PRODUCT: {
      return {...state};
    }

    case ProductsActionTypes.UPDATE_PRODUCT_SUCCESS: {
      const product = { ...<Product>action.payload };

      return productAdapter.updateOne(
        {
          id: product.id,
          changes: product
        },
        state
      );
    }

    case ProductsActionTypes.UPDATE_PRODUCT_ERROR: {
      const error = action.payload;
      return {
        ...state,
        error
      };
    }


    default: {
      return state;
    }
  }
}
