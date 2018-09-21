import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less'],
  providers: [ProductsService]
})
export class ProductListComponent implements OnInit {

  @Output()
  onBuy: EventEmitter<Product> = new EventEmitter();

  productList: Product[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getProducts()
      .then(products => this.productList = products);
  }

  onBuyProduct(product) {
    this.onBuy.emit(product);
  }

}
