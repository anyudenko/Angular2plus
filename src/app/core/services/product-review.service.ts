import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: 'root'
})
export class ProductReviewsService {
  isDisplayed = false;

  private reviews: string[] = [];

  addReview(review: string) {
    const currentDate = new Date();
    this.reviews.unshift(`${review} (${currentDate.toLocaleString()})`);
  }

  getReviews(): Array<string> {
    return this.reviews;
  }
}
