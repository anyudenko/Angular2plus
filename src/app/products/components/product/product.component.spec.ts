import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProductComponent } from './product.component';
import { Product } from '../../models';


let component: ProductComponent;
let fixture: ComponentFixture<ProductComponent>;
let productEl: DebugElement;

const testProducts = [{
  "id": 1,
  "name": "Test name",
  "description": "Description of the test product.",
  "price": 25,
  "category": "test category",
  "isAvailable": true
},
{
  "id": 2,
  "name": "Two",
  "description": "Description ...",
  "price": 300,
  "category": "test category",
  "isAvailable": false
}];


describe('ProductComponent', () => {
  beforeEach(() =>{
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ProductComponent]
    });

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;

    productEl = fixture.debugElement.query(By.css('.product-wrap'));
  });


  it('ProductComponent should have a piped title (uppercase)', () => {
    component.product = testProducts[0];
    component.mode = '';
    fixture.detectChanges();

    const titleEl = fixture.debugElement.query(By.css('.card-title'));
    const expectedPipedName = testProducts[0].name.toUpperCase();
    expect(titleEl.nativeElement.textContent).toContain(expectedPipedName);
  });


  it('ProductComponent should be disabled if he isn\'t available (isAvailable = false)', () => {
    component.product = testProducts[1];
    component.mode = '';
    fixture.detectChanges();

    expect(productEl.nativeElement.className).toContain('disabled');
  });


  it('ProductComponent shouldn\'t be disabled if he is available (isAvailable = true)', () => {
    component.product = testProducts[0];
    component.mode = '';
    fixture.detectChanges();

    expect(productEl.nativeElement.className).not.toContain('disabled');
  });


  it('ProductComponent should call buyProduct event when Buy btn clicked', () => {
    component.product = testProducts[0];
    component.mode = '';
    fixture.detectChanges();

    let selectedProduct;
    const buyBtnEl = fixture.debugElement.query(By.css('.btn'));

    component.buyProduct.subscribe(value => {
      expect(value.product).toEqual(testProducts[0]);
    });

    buyBtnEl.triggerEventHandler('click', null);
  });
});
