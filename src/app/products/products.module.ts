import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { productsReducer, ProductsEffects } from './../core/+store';

import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';

import {
  ProductListComponent,
  ProductComponent,
  ProductFormComponent } from './components';
import { ProductsPromiseService } from './services';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ProductsRoutingModule,
    StoreModule.forFeature('products', productsReducer),
    EffectsModule.forFeature([ProductsEffects])
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
    ProductsPromiseService
  ]
})
export class ProductsModule { }
