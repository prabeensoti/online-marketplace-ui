import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vendor-details-form',
  templateUrl: './vendor-details-form.component.html',
  styleUrls: ['./vendor-details-form.component.scss']
})
export class VendorDetailsFormComponent implements OnInit {

  @Input() parentForm!: FormGroup;

  @Output() next: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  get currentFormGroup(): FormGroup {
    return (this.parentForm.controls['vendorDetails'] as FormGroup);
  }

  // get formControls(): { [p: string]: AbstractControl } {
  //   return this.currentFormGroup.controls;
  // }

  ngOnInit(): void {
  }

  onNext(isNext: boolean = true) {
    if (isNext && (this.parentForm.controls['vendorDetails'] as FormGroup).valid) {
      this.next.emit(true);
    } else if (!isNext) {
      this.next.emit(false);
    }
    // const vendorDetails = this.vendorDetailsForm.value;
    // this.next.emit({vendorDetails, onNext});
  }

}
