import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { CartListComponent } from './cart-list/cart-list.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartTotalComponent } from './cart-total/cart-total.component';

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
