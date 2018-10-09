import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter } from '@angular/core';

import { Product } from '../../models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {
  @Input() product:Product;
  @Input() mode:string;

  @Output()
  buyProduct: EventEmitter<any> = new EventEmitter();
  @Output()
  editProduct: EventEmitter<Product> = new EventEmitter<Product>();
  @Output()
  deleteProduct: EventEmitter<Product> = new EventEmitter<Product>();

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

  onEditProduct() {
    this.editProduct.emit(this.product);
  }

  onDeleteProduct() {
    this.deleteProduct.emit(this.product);
  }
}
