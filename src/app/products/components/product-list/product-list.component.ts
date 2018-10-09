import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../models';

import { ProductsService } from '../../services';
import { CartService } from '../../../cart';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnInit {
  @Input() mode?:string;

  productList = this.productsService.getProducts();
  //mode:string;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.mode = this.mode == 'admin' ? 'admin' : 'guest';
  }

  onBuyProduct(product): void {
    if(product.product.isAvailable) {
      this.cartService.addProduct(product.product, product.qty);
    }
  }

  onEditProduct(product) {
    //create absolute path /edit/productID
    const link = ['/edit', product.id];
    this.router.navigate(link);
  }

  onDeleteProduct(product) {
    this.productsService.deleteProduct(product);
  }

  onCreateProduct(product) {
    this.router.navigate(['/new']);
  }
}
