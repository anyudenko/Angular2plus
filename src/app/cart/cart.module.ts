import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartService } from '../services/cart.service';
import { CartListComponent } from './cart-list/cart-list.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartTotalComponent } from './cart-total/cart-total.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CartListComponent,
    CartItemComponent,
    CartTotalComponent
  ],
  exports: [
    CartListComponent
  ],
  providers: [
    CartService
  ]
})
export class CartModule { }
