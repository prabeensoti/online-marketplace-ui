import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vendor-payment-form',
  templateUrl: './vendor-payment-form.component.html',
  styleUrls: ['./vendor-payment-form.component.scss']
})
export class VendorPaymentFormComponent {

  @Output() previous: EventEmitter<any> = new EventEmitter();
  @Output() next: EventEmitter<any> = new EventEmitter();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      nameOnCard: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', Validators.required]
    });
  }

  onNext() {
    this.next.emit("");
  }

  onPrevious() {
    this.previous.emit("");
  }

}
