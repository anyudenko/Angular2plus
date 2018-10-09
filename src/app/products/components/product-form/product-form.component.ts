import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { Product } from '../../models';
import { ProductsService } from '../../services';

@Component({
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.less']
})
export class ProductFormComponent implements OnInit {
  product:Product;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.product = new Product();

    this.route.paramMap
      .pipe(
        switchMap((params: Params) => {
          const productID = params.get('productID');

          if(productID != null) {
            return this.productsService.getProduct(+productID);
          } else {
            return Promise.resolve(this.product);
          }
        })
      )
      .subscribe(
        product => this.product = {...product},
        err => console.log(err)
    );
  }

  onSaveProduct() {
    const product = { ...this.product };

    if (product.id != null) {
      this.productsService.updateProduct(product);
    } else {
      this.productsService.createProduct(product);
    }

    this.onGoBack();
  }

  onGoBack() {
    this.router.navigate(['/admin/products']);
  }
}
