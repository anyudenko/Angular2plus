import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CartItemComponent } from './cart-item.component';
import { HighlightByHoverDirective } from '../../../shared/directives/highlight-by-hover.directive';


let component: CartItemComponent;
let fixture: ComponentFixture<CartItemComponent>;

const testCartProduct = {
  "id": 1,
  "name": "Test name",
  "description": "Description of the test product.",
  "price": 25,
  "category": "test category",
  "isAvailable": true,
  "qty": 2
};


describe('CartItemComponent', () => {
  beforeEach(() =>{
    TestBed.configureTestingModule({
      declarations: [
        CartItemComponent,
        HighlightByHoverDirective
      ]
    });

    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
  });

  it('CartItemComponent should change background by hover', () => {
    component.cartItem = testCartProduct;
    const highlightEl = fixture.debugElement.query(By.css('.cart-item > div'));
    fixture.detectChanges();

     highlightEl.nativeElement.addEventListener('mouseenter', (e) => {
       expect(highlightEl.nativeElement.style.backgroundColor).not.toEqual('');
     });

     let event = new Event('mouseenter');
     highlightEl.nativeElement.dispatchEvent(event);
  });

  it('CartItemComponent should call qtyDecrease event by "-" btn clicked', () => {
    component.cartItem = testCartProduct;
    fixture.detectChanges();

    const buyBtnEl = fixture.debugElement.queryAll(By.css('.btn'))[0];

    component.qtyDecrease.subscribe(value => {
      expect(value).toEqual(testCartProduct);
    });

    buyBtnEl.triggerEventHandler('click', null);
  });

  it('CartItemComponent should call qtyIncrease event by "+" btn clicked', () => {
    component.cartItem = testCartProduct;
    fixture.detectChanges();

    const buyBtnEl = fixture.debugElement.queryAll(By.css('.btn'))[1];

    component.qtyIncrease.subscribe(value => {
      expect(value).toEqual(testCartProduct);
    });

    buyBtnEl.triggerEventHandler('click', null);
  });
});
