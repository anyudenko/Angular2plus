import { Component, OnInit, OnDestroy } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  AbstractControl } from '@angular/forms';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.css']
})
export class ProcessOrderComponent implements OnInit, OnDestroy {
  private sub: Subscription;

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
    phone: '',
    city: '',
    streetLine1:''
  };


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.watchValueChanges();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  private buildForm() {
    this.orderForm = this.fb.group({
      firstName: new FormControl('', {
        validators: [
          Validators.required,
          Validators.maxLength(10)
        ],
        updateOn: 'blur'
      }),

      lastName: new FormControl('', {
        validators: [
          Validators.required,
          Validators.maxLength(30)
        ],
        updateOn: 'blur'
      }),

      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'),
          Validators.email
        ],
        updateOn: 'blur'
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
        ],
        updateOn: 'blur'
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
  }

  onDeletePhone(index) {
    this.phoneList.removeAt(index);
  }


  private watchValueChanges() {
    this.sub = this.orderForm
      .get('deliveryType').valueChanges
      .subscribe(value =>
        this.setDeliveryType(value)
      );
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


  completeOrder() {
    /*let order = {
      id: null,
      cart: this.cartList,
      totalPrice: this.cartTotal.totalPrice,
      totalQty: this.cartTotal.totalQty
    };
    this.orderService.addOrder(order);
    this.onClearCart();*/
  }
}
