import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {
  @Input() product:Product;

  @Output()
  buyProduct: EventEmitter<Product> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onBuyProduct() {
    this.buyProduct.emit(this.product);
  }
}
