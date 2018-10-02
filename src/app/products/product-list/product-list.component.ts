import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product.model';

import { ProductsService } from '../services/products.service';
import { CartService } from '../../cart/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnInit {
  productList = this.productsService.getProducts()

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) { }

  ngOnInit() { }

  onBuyProduct(product): void {
    if(product.product.isAvailable) {
      this.cartService.addProduct(product.product, product.qty);
    }
  }
}
