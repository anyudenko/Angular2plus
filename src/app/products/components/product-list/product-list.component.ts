import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription} from 'rxjs';

import { Product } from '../../models';
import { ProductsPromiseService } from '../../services';
import { CartObservableService } from '../../../cart';

import { AutoUnsubscribe } from '../../../core';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
@AutoUnsubscribe()
export class ProductListComponent implements OnInit {
  @Input() mode?:string;

  private sub: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;

  productList = this.productsPromiseService.getProducts();

  constructor(
    private productsPromiseService: ProductsPromiseService,
    private cartObservableService: CartObservableService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.mode = this.mode == 'admin' ? 'admin' : 'guest';
  }

  onBuyProduct(product): void {
    if(product.product.isAvailable) {
      const cartItem = product.product;
      cartItem.qty = product.qty;

      this.sub = this.cartObservableService
        .getCartProduct(cartItem.id)
        .subscribe(
          data => {
            //update
            cartItem.qty += data.qty;
            this.sub2 = this.cartObservableService
              .updateCartItem(cartItem)
              .subscribe();
          },
          error => {
            //create
            this.sub3 = this.cartObservableService
              .createCartItem(cartItem)
              .subscribe();
          }
        );
    }
  }

  onEditProduct(product) {
    //create absolute path /edit/productID
    const link = ['/edit', product.id];
    this.router.navigate(link);
  }

  onDeleteProduct(product) {
    this.productsPromiseService.deleteProduct(product)
      .then(() => {
        this.productList = this.productsPromiseService.getProducts()
      })
      .catch(err => console.log(err));
  }

  onCreateProduct(product) {
    this.router.navigate(['/new']);
  }
}
