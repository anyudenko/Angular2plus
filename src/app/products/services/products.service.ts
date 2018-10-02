import { Injectable } from '@angular/core';
import { PRODUCTS } from './mock-products';

@Injectable()
export class ProductsService {

  constructor() { }

  getProducts() {
    //return Promise.resolve(PRODUCTS);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(PRODUCTS);
      }, 2000);
    });
  }
}
