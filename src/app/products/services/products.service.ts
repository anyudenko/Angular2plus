import { Injectable } from '@angular/core';

import { PRODUCTS } from './mock-products';
import { Product } from '../models';

const productList = PRODUCTS;

@Injectable()
export class ProductsService {
  constructor() { }

  getProducts() {
    return Promise.resolve(productList);
  }

  getProduct(id: number | string): Promise<Product> {
    return this.getProducts()
      .then(products =>
        products.find(product =>
          product.id === +id
        )
      )
      .catch(() =>
        Promise.reject('Error in getProduct method')
      );
  }

  createProduct(product: Product) {
    product.id = this.generateUniqueId();
    productList.push(product);
  }

  updateProduct(product: Product) {
    const i = productList.findIndex(p =>
      p.id === product.id
    );

    if (i > -1) {
      productList.splice(i, 1, product);
    }
  }

  deleteProduct(product: Product) {
    const i = productList.findIndex(p =>
      p.id === product.id
    );

    if (i > -1) {
      productList.splice(i, 1);
    }
  }

  generateUniqueId() {
    return (new Date()).getTime();
  }
}
