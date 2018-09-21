import { Component } from '@angular/core';

import { Product } from './models/product.model';
import { Cart } from './models/cart.model';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [CartService]
})
export class AppComponent {

  title = 'shop';
  cartList:Cart[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getCartProducts()
      .then(products => this.cartList = products);
  }

  onBuyProduct(product: Product): void {
    this.cartService.addProduct(product);
    this.cartService.getCartProducts()
        .then(products => this.cartList = products);
  }

  onDeleteProductFromCart(id: number): void {
      this.cartService.deleteProduct(id);
      this.cartService.getCartProducts()
          .then(products => this.cartList = products);
  }
}
