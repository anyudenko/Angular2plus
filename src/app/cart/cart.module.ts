import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import {
  CartListComponent,
  CartItemComponent,
  CartTotalComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    CartListComponent,
    CartItemComponent,
    CartTotalComponent
  ],
  exports: [
    CartListComponent
  ],
  providers: [ ]
})
export class CartModule { }
