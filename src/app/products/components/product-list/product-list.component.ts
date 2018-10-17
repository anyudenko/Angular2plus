import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../models';

import { ProductsPromiseService } from '../../services';
import { CartObservableService } from '../../../cart';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnInit {
  @Input() mode?:string;

  sub;
  productList = this.productsPromiseService.getProducts();

  constructor(
    private productsPromiseService: ProductsPromiseService,
    private cartObservableService: CartObservableService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.mode = this.mode == 'admin' ? 'admin' : 'guest';
  }

  onBuyProduct(product): void {
    if(product.product.isAvailable) {
      const cartItem = product.product;
      cartItem.qty = product.qty;

      this.sub = this.cartObservableService
        .createCartItem(cartItem)
        .subscribe();
    }
  }

  onEditProduct(product) {
    //create absolute path /edit/productID
    const link = ['/edit', product.id];
    this.router.navigate(link);
  }

  onDeleteProduct(product) {
    this.productsPromiseService.deleteProduct(product)
      .then(() => {
        this.productList = this.productsPromiseService.getProducts()
      })
      .catch(err => console.log(err));
  }

  onCreateProduct(product) {
    this.router.navigate(['/new']);
  }

  ngOnDestroy(): void {
    if (this.sub) {
       this.sub.unsubscribe();
    }
  }
}
