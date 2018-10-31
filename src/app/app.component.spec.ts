import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  DebugElement,
  Component,
  NO_ERRORS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
  RouterLinkStubDirective,
  RouterOutletStubComponent,
  RouterStub} from './testing-helpers';
import { AppComponent } from './app.component';


let fixture: ComponentFixture<AppComponent>;
let links: RouterLinkStubDirective[];
let linkDes: DebugElement[];


describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useClass: RouterStub }
      ],
      declarations: [
        AppComponent,
        RouterLinkStubDirective,
        RouterOutletStubComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    linkDes = fixture.debugElement.queryAll(
      By.directive(RouterLinkStubDirective)
    );

    links = linkDes.map(d =>
      d.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective
    );
  });

  it('There are should be 5 RouterLinks in the template', () => {
    expect(links.length).toBe(5);
  });

  it('The links should be ordered in next way: Products(home), Cart, Admin, Login, Contact Us', () => {
    expect(links[0].linkParams).toBe('/home', '1st link - Products');
    expect(links[1].linkParams).toBe('/cart', '2nd link - Cart');
    expect(links[2].linkParams).toBe('/admin', '3rd link - Admin');
    expect(links[3].linkParams).toBe('/login', '4th link - Login');
    expect(links[4].linkParams).toBe('/contact-us', '5th link - Contact Us');
  });

  it('Links are clickable', () => {
    const cartLinkDe = linkDes[1],
      cartLink = links[1];

    cartLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(cartLink.navigatedTo).toBe('/cart');
  });
});
