import { InjectionToken } from '@angular/core';

const cartBaseUrl = 'http://localhost:3000/cart';
export const CartAPI = new InjectionToken<string>('CartAPI');

export const CartAPIProvider = {
  provide: CartAPI,
  useValue: cartBaseUrl
};
