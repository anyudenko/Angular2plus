import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';

import { ProductsService } from './services/products.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ProductListComponent,
    ProductComponent
  ],
  exports: [
    ProductListComponent
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }
