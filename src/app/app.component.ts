import { Component,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  ElementRef } from '@angular/core';

import { Router } from '@angular/router';

import { ProductReviewsService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  @ViewChild('appTitle')
  appTitle: ElementRef;

  constructor(
      public productReviewsService: ProductReviewsService,
      private router: Router
    ) { }

  ngAfterViewInit() {
    this.appTitle.nativeElement.innerHTML = 'Hello';
  }

  onDisplayProductReviews() {
    this.router.navigate([{
      outlets: {'product-reviews': ['product-reviews']}
    }]);
    this.productReviewsService.isDisplayed = true;
  }
}
