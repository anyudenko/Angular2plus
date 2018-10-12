import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';

import { Product } from '../../models';
import { ProductsPromiseService } from '../../services';

@Component({
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.less']
})
export class ProductFormComponent implements OnInit {
  product:Product;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productsPromiseService: ProductsPromiseService
  ) { }

  ngOnInit() {
    this.product = new Product();

    this.route.paramMap
      .pipe(
        switchMap((params: Params) => {
          const productID = params.get('productID');

          if(productID != null) {
            return this.productsPromiseService.getProduct(+productID);
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
    const method = product.id != null ? 'updateProduct' : 'createProduct';

    this.productsPromiseService[method](product)
      .then(() => this.onGoBack())
      .catch(err => console.log(err));
  }

  onGoBack() {
    this.router.navigate(['/admin/products']);
  }
}
