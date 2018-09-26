import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';

import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProductListComponent,
    ProductComponent
  ],
  exports: [
    ProductListComponent
  ],
  providers: [
    ProductsService,
    CartService
  ]
})
export class ProductsModule { }
