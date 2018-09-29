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
  buyProduct: EventEmitter<any> = new EventEmitter();

  qty:any = '';

  constructor() { }

  ngOnInit() { }

  onBuyProduct() {
    const qty = (this.qty ? this.qty : 1);
    this.buyProduct.emit({
        product: this.product,
        qty: +qty
      });
  }
}
