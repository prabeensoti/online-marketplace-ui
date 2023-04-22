import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vendor-payment-form',
  templateUrl: './vendor-payment-form.component.html',
  styleUrls: ['./vendor-payment-form.component.scss']
})
export class VendorPaymentFormComponent implements OnInit {

  @Input() parentForm!: FormGroup;
  @Output() next: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  ngOnInit(): void {
  }

  get currentFormGroup(): FormGroup {
    return (this.parentForm.controls['cardInfo'] as FormGroup);
  }

  onNext(isNext: boolean = true) {
    if (isNext && (this.parentForm.controls['cardInfo'] as FormGroup).valid) {
      this.next.emit(true);
    } else if (!isNext) {
      this.next.emit(false);
    }
  }

}
