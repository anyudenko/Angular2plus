import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductReviewsService } from '../../../core';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.less']
})
export class ProductReviewsComponent implements OnInit {
  review = '';

  constructor(
    public productReviewsService: ProductReviewsService,
    private router: Router
  ) {}

  ngOnInit() {}

  onClose() {
    this.router.navigate([{
      outlets: {'product-reviews': null}
    }]);
    this.productReviewsService.isDisplayed = false;
  }

  onReviewSave() {
    if (this.review) {
      this.productReviewsService.addReview(this.review);
      this.review = '';
    }
  }
}
