import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { ProductListComponent, ProductComponent } from './components';
import { ProductsService } from './services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
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
