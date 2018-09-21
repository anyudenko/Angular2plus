import { Component, OnInit } from '@angular/core';

enum Category {
  Book = 0,
  Sweets = 1,
  Smartphone = 2
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.less']
})
export class ProductComponent implements OnInit {

  name: string = 'Lorem ipsum';
  description: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing ' +
    'elit. Donec et porta ipsum, ut consequat nisi. Sed a enim interdum, ' +
    'bibendum neque in, volutpat nunc. Donec accumsan eros in lobortis ' +
    'placerat. Nullam suscipit sit amet turpis dapibus lobortis.';
  price: number = 275;
  category: Category.Book;
  isAvailable: boolean = true;
  authors: string[] = ['Homer Simpson', 'Ivan Ivanov'];

  constructor() { }

  ngOnInit() { }

  onBuy() {
    console.log('Product successfully has been bought!');
  }
}
