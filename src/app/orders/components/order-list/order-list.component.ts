import { Component, OnInit } from '@angular/core';

import { Order } from '../../models';
import { OrderService } from '../../services';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.less']
})
export class OrderListComponent implements OnInit {
  orderList:Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders()
      .then(data => {
        this.orderList = data;
      });
  }
}
