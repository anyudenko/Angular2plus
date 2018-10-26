import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  OrderListComponent,
  OrderItemComponent,
  ProcessOrderComponent} from './components';
import { OrderService } from './services';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    OrderListComponent,
    OrderItemComponent,
    ProcessOrderComponent
  ],
  exports: [
    OrderListComponent,
    ProcessOrderComponent
  ],
  providers: [
    OrderService
  ]
})
export class OrdersModule { }
