import { Injectable, Inject } from '@angular/core';

import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, concatMap, catchError } from 'rxjs/operators';

import { Cart } from '../../cart/models';
import { CartAPI } from './../cart.config';


@Injectable({
  providedIn: 'root'
})
export class CartObservableService {

  cartProducts:Cart[] = [];

  constructor(
    private http: HttpClient,
      @Inject(CartAPI) private cartUrl: string
  ) { }

  getCartProducts(): Observable<Cart[]> {
    return this.http
      .get<Cart[]>(this.cartUrl)
      .pipe(catchError(this.handleError));
  }

  getCartProduct(id: number): Observable<Cart> {
    const url = `${this.cartUrl}/${id}`;

    return this.http
      .get<Cart>(url)
      .pipe(catchError(this.handleError));
  }

  createCartItem(cartItem:Cart): Observable<Cart> {
    const url = this.cartUrl,
      body = JSON.stringify(cartItem),
      options = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      };

    return this.http
      .post<Cart>(url, body, options)
      .pipe(catchError(this.handleError));
  }

  deleteCartItem(cartItem:Cart): Observable<Cart[]> {
    const url = `${this.cartUrl}/${cartItem.id}`;

    return this.http.delete(url)
      .pipe(
        concatMap(() => this.getCartProducts())
      );
  }

  updateCartItem(cartItem:Cart): Observable<Cart> {
    const url = `${this.cartUrl}/${cartItem.id}`,
      body = JSON.stringify(cartItem),
      options = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      };

    return this.http
      .put<Cart>(url, body, options)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;

    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}, body was: ${
        err.error
      }`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
