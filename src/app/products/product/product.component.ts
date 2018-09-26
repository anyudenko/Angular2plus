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
  onBuy: EventEmitter<Product> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onBuyProduct() {
    this.onBuy.emit(this.product);
  }
}
