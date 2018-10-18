import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Product } from '../models';
import { AppSettingsService } from '../../core/services';

@Injectable()
export class ProductsPromiseService {
  //private productsUrl = 'http://localhost:3000/products';
  private productsUrl;

  constructor(
    private http: HttpClient,
    private appSettings: AppSettingsService
  ) { }

  async getProducts(): Promise<Product[]> {
    var settings = await this.appSettings.getSettings();
    this.productsUrl = settings.productsUrl;

    return this.http
      .get(this.productsUrl)
      .toPromise()
      .then(response => <Product[]>response)
      .catch(this.handleError);
  }

  getProduct(id: number | string): Promise<Product> {
    const url = `${this.productsUrl}/${id}`;

    return this.http
      .get(url)
      .toPromise()
      .then(response => <Product>response)
      .catch(this.handleError);
  }

  createProduct(product: Product): Promise<Product> {
    const url = this.productsUrl,
      body = JSON.stringify(product),
      options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

    return this.http
      .post(url, body, options)
      .toPromise()
      .then(response => <Product>response)
  }

  updateProduct(product: Product): Promise<Product> {
    const url = `${this.productsUrl}/${product.id}`,
      body = JSON.stringify(product),
      options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      };

    return this.http
      .put(url, body, options)
      .toPromise()
      .then(response => <Product>response)
      .catch(this.handleError);
  }

  deleteProduct(product: Product): Promise<Product> {
    const url = `${this.productsUrl}/${product.id}`;

    return (
      this.http
        .delete(url)
        .toPromise()
        .catch(this.handleError)
    );
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
