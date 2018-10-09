import { Injectable } from '@angular/core';

import { Order } from '../models';

const orderList:Order[] = [];

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor() { }

  getOrders() {
    return Promise.resolve(orderList);
  }

  addOrder(order:Order) {
    order.id = this.generateUniqueId();
    orderList.push(order);
  }

  generateUniqueId() {
    return (new Date()).getTime();
  }
}
