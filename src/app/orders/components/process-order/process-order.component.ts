import { Component, OnInit, OnDestroy } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  AbstractControl } from '@angular/forms';

import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Cart } from '../../../cart/models';
import { CartObservableService } from '../../../cart/services';
import { OrderService } from '../../services';

import { Store } from '@ngrx/store';
import { AppState } from './../../../core/+store';
import * as RouterActions from './../../../core/+store/router/router.actions';


@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.css']
})
export class ProcessOrderComponent implements OnInit, OnDestroy {
  cartList:Cart[] = [];
  cartTotal:any = {
    totalQty: 0,
    totalPrice: 0
  };

  private sub: Subscription;
  private cartSub: Subscription;

  orderForm: FormGroup;

  cityList: Array<string> = [
    'Kiev',
    'Kharkiv',
    'Dnipro',
    'Lviv'
  ];

  validationMessages = {
    firstName: '',
    lastName: '',
    email: '',
    phone: [],
    city: '',
    streetLine1:''
  };


  constructor(
    private fb: FormBuilder,
    private cartObservableService: CartObservableService,
    private orderService: OrderService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    //cart functionality
    this.cartSub = this.cartObservableService.getCartProducts()
      .subscribe(products => {
        this.cartList = products;
        this.generateTotalInfo();
      });

    //form functionality
    this.buildForm();
    this.setDeliveryType(this.orderForm.get('deliveryType').value);
    this.watchValueChanges();
  }

  ngOnDestroy() {
    this.cartSub.unsubscribe();
    this.sub.unsubscribe();
  }


  private buildForm() {
    this.orderForm = this.fb.group({
      firstName: new FormControl('', {
        validators: [
          Validators.required,
          Validators.maxLength(10)
        ]
      }),

      lastName: new FormControl('', {
        validators: [
          Validators.required,
          Validators.maxLength(30)
        ]
      }),

      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'),
          Validators.email
        ]
      }),

      phoneList: this.fb.array([
        this.buildPhone()
      ]),

      deliveryType: 'self',
      paymentType: 'cash',

      address: this.buildAddress()
    });
  }

  private buildPhone() {
    return this.fb.group({
      phone: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern('[0-9]+')
        ]
      })
    });
  }

  private buildAddress() {
    return this.fb.group({
      city: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
      streetLine1: new FormControl('', {
        validators: [
          Validators.required
        ]
      }),
      streetLine2: ''
    });
  }


  get phoneList(): FormArray {
    return <FormArray>this.orderForm.get('phoneList');
  }

  get address(): FormGroup {
    return <FormGroup>this.orderForm.get('address');
  }


  onAddPhone() {
    this.phoneList.push(this.buildPhone());
    this.initPhoneValidate();
  }

  onDeletePhone(index) {
    this.phoneList.removeAt(index);
    this.validationMessages.phone.splice(index, 1);
  }


  private watchValueChanges() {
    this.sub = this.orderForm
      .get('deliveryType').valueChanges
      .subscribe(value =>
        this.setDeliveryType(value)
      );

    this.initFormValidate();
  }

  private setDeliveryType(type: string) {
    const controls = new Map();

    controls.set('addressGroup', this.orderForm.get('address'));
    controls.set('cityControl', this.orderForm.get('address.city'));
    controls.set('streetLine1Control', this.orderForm.get('address.streetLine1'));

    if (type === 'self') {
      controls.get('cityControl').clearValidators();
      controls.get('streetLine1Control').clearValidators();
    } else {
      controls.get('cityControl')
        .setValidators([
          Validators.required
        ]);
      controls.get('streetLine1Control')
        .setValidators([
          Validators.required
        ]);
    }

    controls.forEach(control =>
      control.updateValueAndValidity()
    );
  }

  initFormValidate() {
    const controls = new Map();

    controls.set('firstNameControl', this.orderForm.get('firstName'));
    controls.set('lastNameControl', this.orderForm.get('lastName'));
    controls.set('emailControl', this.orderForm.get('email'));
    controls.set('cityControl', this.orderForm.get('address.city'));
    controls.set('streetLine1Control', this.orderForm.get('address.streetLine1'));

    controls.forEach(control => {
      const sub = control.valueChanges
        .pipe(
          debounceTime(1500)
        )
        .subscribe(value => {
          this.setValidationMessage(control);
        });

      this.sub.add(sub);
    });

    this.initPhoneValidate();
  }

  initPhoneValidate() {
    const phoneAmount = this.phoneList.length;

    const phoneControl = this.orderForm
      .get('phoneList.' + (phoneAmount - 1) + '.phone');

    const sub = phoneControl.valueChanges
      .pipe(
        debounceTime(1500)
      )
      .subscribe(value => {
        this.setValidationMessage(phoneControl, true);
      });

    this.sub.add(sub);
  }

  getControlName(c: AbstractControl): string | null {
      const formGroup = c.parent.controls;
      const controlName = Object.keys(formGroup)
        .find(name =>
          c === formGroup[name]
        ) || null;

      return controlName;
  }

  private setValidationMessage(c: AbstractControl, isArray: boolean = false) {
    const controlName = this.getControlName(c);
    const index = isArray ? this.getControlName(c.parent) : null;
    let errorMessage = '';

    if(controlName == null) return;

    //reset of error message
    if(isArray) {
      this.validationMessages[controlName][index] = '';
    } else {
      this.validationMessages[controlName] = '';
    }

    //generate error message
    if ((c.touched || c.dirty) && c.errors) {
      if(c.errors.required) {
        errorMessage = 'This field is required.';
      } else if(c.errors.maxlength) {
        errorMessage = 'Max length is ' +
          c.errors.maxlength.requiredLength + ' letters.';
      } else if(c.errors.minlength) {
        errorMessage = 'Min length is ' +
          c.errors.minlength.requiredLength + ' letters.';
      } else if (c.errors.pattern) {
        errorMessage = 'Wrong value.';

        if(controlName == 'email') {
          errorMessage += ' E.g.: example@gmail.com';
        } else if(controlName == 'phone') {
          errorMessage += ' Only digits are available.';
        }
      }

      //set error message
      if(isArray) {
        this.validationMessages[controlName][index] = errorMessage;
      } else {
        this.validationMessages[controlName] = errorMessage;
      }
    }
  }


  onBlur(controlName, isArray) {
      const control = this.orderForm.get(controlName);
      this.setValidationMessage(control, isArray);
  }


  //cart functionality (moved here after completeOrder logic was changed)
  generateTotalInfo() {
    let totalQty = 0;
    let totalPrice = 0;

    for (let i = 0; i < this.cartList.length; i++)  {
      totalQty += this.cartList[i].qty;
      totalPrice += (this.cartList[i].qty * this.cartList[i].price);
    }

    this.cartTotal.totalQty = totalQty;
    this.cartTotal.totalPrice = totalPrice;
  }

  completeOrder() {
    let order = {
      id: null,
      cart: this.cartList,
      totalPrice: this.cartTotal.totalPrice,
      totalQty: this.cartTotal.totalQty
    };
    this.orderService.addOrder(order);
    this.store.dispatch(new RouterActions.Go({
      path: ['/home']
    }));
  }
}
