import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product.model';

import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.productsService.getProducts()
      .then(products => this.productList = products);
  }

  onBuyProduct(product: Product): void {
    if(product.isAvailable) {
      this.cartService.addProduct(product);
      this.cartService.generateTotalInfo();
    }
  }
}
