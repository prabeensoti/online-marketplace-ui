import { Component } from '@angular/core';

@Component({
  selector: 'app-vendor-registration',
  templateUrl: './vendor-registration.component.html',
  styleUrls: ['./vendor-registration.component.scss']
})
export class VendorRegistrationComponent {

  step = 1;

  constructor() { }

  onNext() {
    this.step++;
  }

  onPrevious() {
    this.step--;
  }

  onVendorRegistration(event: any): void {
    console.log("Account created");
    this.onNext();
  }

  onVendorDetailsSaved(event: any): void {
    console.log("Details completed");
    this.onNext();
  }

  onRegistrationPayment(event: any): void {
    console.log("Payment Done");
    this.onNext();
  }

}
