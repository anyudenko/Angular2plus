import { ProductsState, initialProductsState } from './products.state';
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
      const data = [...<Array<Product>>action.payload];
      return {
        ...state,
        data
      };
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
      const data = state.data.filter(p => p.id !== product.id);
      return {
        ...state,
        data
      };
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
      const data = [...state.data, product];

      return {
        ...state,
        data
      };
    }

    case ProductsActionTypes.CREATE_PRODUCT_ERROR: {
      const error = action.payload;
      return {
        ...state,
        error
      };
    }


    case ProductsActionTypes.UPDATE_PRODUCT: {
      return {...state};
    }

    case ProductsActionTypes.UPDATE_PRODUCT_SUCCESS: {
      const product = { ...<Product>action.payload };
      const data = [...state.data];
      const index = data.findIndex(p => p.id !== product.id);
      data[index] = product;
      return {
        ...state,
        data
      };
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
