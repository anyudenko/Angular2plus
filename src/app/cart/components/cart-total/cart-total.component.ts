import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrls: ['./cart-total.component.less']
})
export class CartTotalComponent implements OnInit {
  @Input() total:any;

  constructor() { }

  ngOnInit() { }
}
