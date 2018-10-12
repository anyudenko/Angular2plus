import { Component, OnInit, Input } from '@angular/core';
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
      this.cartObservableService.addProduct(product.product, product.qty);
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
}
