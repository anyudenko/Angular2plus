import { Component, OnInit, Input } from '@angular/core';

import { Order } from '../../models';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.less']
})
export class OrderItemComponent implements OnInit {
  @Input() orderItem:Order;

  constructor() { }

  ngOnInit() { }
}
