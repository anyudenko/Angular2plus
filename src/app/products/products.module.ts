import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';

import {
  ProductListComponent,
  ProductComponent,
  ProductFormComponent } from './components';
import { ProductsService } from './services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ProductsRoutingModule
  ],
  declarations: [
    ProductListComponent,
    ProductComponent,
    ProductFormComponent
  ],
  exports: [
    ProductListComponent
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }
