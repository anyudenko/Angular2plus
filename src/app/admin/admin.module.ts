import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersModule } from './../orders/orders.module';
import { ProductsModule } from './../products/products.module';
import { AdminComponent } from './admin.component';

import {
  AdminRoutingModule,
  adminRouterComponents } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ProductsModule,
    OrdersModule,
    AdminRoutingModule
  ],
  declarations: [
    adminRouterComponents
  ]
})
export class AdminModule { }
