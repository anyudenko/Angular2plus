import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderListComponent, OrderItemComponent } from './components';
import { OrderService } from './services';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    OrderListComponent,
    OrderItemComponent
  ],
  exports: [
    OrderListComponent
  ],
  providers: [
    OrderService
  ]
})
export class OrdersModule { }
